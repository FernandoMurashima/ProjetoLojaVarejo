import { Component, OnInit } from '@angular/core';
import { UserService, User, UserCreate } from '../../service/user.service';
import { Router } from '@angular/router';

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

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
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
    }
  }

  resetAction() {
    this.action = '';
    this.user = this.createEmptyUser();
    this.userSelecionado = undefined;
    this.successMessage = '';
    this.errorMessage = '';
  }

  goToIndex() {
    this.router.navigate(['/home']);
  }

  loadUsers() {
    this.userService.load().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {
        console.error('Erro ao carregar usuários', error);
      }
    });
  }

  addUser() {
    if (window.confirm('Confirma a inclusão do novo usuário?')) {
      const userParaEnviar: UserCreate = {
        username: this.user.username,
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email: this.user.email,
        password: this.user.password,
        is_superuser: this.user.is_superuser,
        is_staff: this.user.is_staff,
        is_active: this.user.is_active,
        date_joined: this.user.date_joined,
        last_login: this.user.last_login,
        type: this.user.type
      };

      this.userService.addUser(userParaEnviar).subscribe({
        next: (data) => {
          this.successMessage = 'Usuário adicionado com sucesso!';
          this.resetAction();
        },
        error: (error) => {
          console.error('Erro ao cadastrar usuário:', error);
          this.errorMessage = 'Erro ao cadastrar usuário. Por favor, tente novamente.';
        }
      });
    }
  }

  onUserChange(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
    this.userSelecionado = this.users.find(u => u.id === +selectedId) ?? undefined;

    if (this.userSelecionado) {
      this.user = { ...this.userSelecionado };
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
}
