import { Component, OnInit } from '@angular/core';
import { UserService, User, UserCreate } from '../../service/user.service';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User = this.createEmptyUser();
  users: User[] = [];
  userSelecionado?: User;
  action: string = '';

  // Variáveis locais para armazenar dados de entrada do formulário
  usernameInput: string = '';
  passwordInput: string = '';
  firstNameInput: string = '';
  lastNameInput: string = '';
  emailInput: string = '';
  typeInput: string = '';

  // Verificação de disponibilidade de nome de usuário
  usernameAvailable: boolean = true;
  usernameCheck$ = new Subject<string>();

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.createEmptyUser();
    this.loadUsers();
    this.setupUsernameCheck();
    console.log('Component initialized with empty user:', this.user);
  }

  createEmptyUser(): User {
    return {
      id: 0,
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      is_superuser: false,
      is_staff: false,
      is_active: true,
      date_joined: new Date(),
      last_login: null,
      type: 'Regular'
    };
  }

  setAction(action: string) {
    this.action = action;
    if (action === 'consultar' || action === 'editar' || action === 'excluir') {
      this.loadUsers();
    } else if (action === 'cadastrar') {
      this.resetFormInputs();
      this.user = this.createEmptyUser();
      console.log('Entering cadastrar action, input states:', {
        usernameInput: this.usernameInput,
        passwordInput: this.passwordInput,
        firstNameInput: this.firstNameInput,
        lastNameInput: this.lastNameInput,
        emailInput: this.emailInput,
        typeInput: this.typeInput
      });
    }
  }

  resetAction() {
    this.action = '';
    this.resetFormInputs();
    this.user = this.createEmptyUser();
    this.userSelecionado = undefined;
    this.successMessage = '';
    this.errorMessage = '';
    console.log('Action reset, user state:', this.user);
  }

  resetFormInputs() {
    // Reinicia todas as variáveis de entrada
    this.usernameInput = '';
    this.passwordInput = '';
    this.firstNameInput = '';
    this.lastNameInput = '';
    this.emailInput = '';
    this.typeInput = 'Regular';
    this.usernameAvailable = true;
  }

  goToIndex() {
    this.router.navigate(['/home']);
  }

  loadUsers() {
    this.userService.load().subscribe({
      next: (data) => {
        this.users = data;

        /* this.users = this.users.map((user, index) => ({ ...user, id: index + 1 })); */


        console.log('Users loaded:', this.users); // Verifique se os IDs estão aqui
        this.users.forEach(user => console.log(`User ID: ${user.id}, Username: ${user.username}`));
      },
      error: (error) => {
        console.error('Erro ao carregar usuários', error);
      }
    });
  }
  
  addUser() {
    if (!this.usernameAvailable) {
      this.errorMessage = 'O nome de usuário já está em uso. Escolha outro antes de salvar.';
      return;
    }
  
    if (window.confirm('Confirma a inclusão do novo usuário?')) {
      const userParaEnviar: UserCreate = {
        username: this.usernameInput,
        first_name: this.firstNameInput,
        last_name: this.lastNameInput,
        email: this.emailInput,
        password: this.passwordInput,
        is_superuser: this.user.is_superuser,
        is_staff: this.user.is_staff,
        is_active: this.user.is_active,
        date_joined: this.user.date_joined,
        last_login: this.user.last_login,
        type: this.typeInput
      };
  
      console.log('Tipo selecionado:', this.typeInput);
      console.log('Dados sendo enviados para o backend:', userParaEnviar);
  
      this.userService.addUser(userParaEnviar).subscribe({
        next: (data) => {
          this.successMessage = 'Usuário adicionado com sucesso!';
          this.resetAction();
          console.log('Novo usuário adicionado:', data);
        },
        error: (error) => {
          console.error('Erro ao cadastrar usuário:', error);
          if (error.status === 400 && error.error && error.error.username) {
            this.errorMessage = 'Erro: O nome de usuário já existe. Por favor, escolha outro.';
          } else {
            this.errorMessage = 'Erro ao cadastrar usuário. Por favor, tente novamente.';
          }
        }
      });
    }
  }

  onUserChange(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
    console.log("Selected user ID:", selectedId);
    this.userSelecionado = this.users.find(u => u.id === +selectedId) ?? undefined;
  
    if (this.userSelecionado) {
      this.user = { ...this.userSelecionado };
      console.log("Usuário selecionado:", this.userSelecionado);
    } else {
      console.error("Usuário não encontrado para o ID:", selectedId);
    }
  }
  


  updateUser() {
    if (window.confirm('Confirma a alteração do usuário?')) {
      if (!this.userSelecionado) return;

      const userParaEnviar = { ...this.user };
      this.userService.updateUser(this.userSelecionado.id, userParaEnviar).subscribe({
        next: (data) => {
          this.successMessage = 'Usuário atualizado com sucesso!';
          this.resetAction();
        },
        error: (error) => {
          this.errorMessage = 'Erro ao atualizar usuário. Por favor, tente novamente.';
        }
      });
    }
  }

  deleteUser() {
    if (window.confirm('Confirma a exclusão do usuário?')) {
      if (!this.userSelecionado) return;

      this.userService.deleteUser(this.userSelecionado.id).subscribe({
        next: (data) => {
          this.successMessage = 'Usuário excluído com sucesso!';
          this.resetAction();
        },
        error: (error) => {
          this.errorMessage = 'Erro ao excluir usuário. Por favor, tente novamente.';
        }
      });
    }
  }

  setupUsernameCheck() {
    this.usernameCheck$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(username => this.userService.checkUsernameAvailability(username))
    ).subscribe(response => {
      this.usernameAvailable = response.available;
      if (!this.usernameAvailable) {
        this.errorMessage = 'O nome de usuário já está em uso. Por favor, escolha outro.';
      } else {
        this.errorMessage = '';
      }
    });
  }

  onUsernameChange(username: string) {
    this.usernameCheck$.next(username);
  }
}
