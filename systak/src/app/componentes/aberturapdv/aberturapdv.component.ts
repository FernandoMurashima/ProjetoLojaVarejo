import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../../service/auth.service';  // Supondo que você tem um serviço de autenticação
import { Router } from '@angular/router';

@Component({
  selector: 'app-aberturapdv',
  templateUrl: './aberturapdv.component.html',
  styleUrls: ['./aberturapdv.component.css']
})
export class AberturaPdvComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    public dialogRef: MatDialogRef<AberturaPdvComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService,  // Servico de autenticação
    private router: Router
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  login(): void {
    this.authService.authenticate(this.username, this.password).subscribe({
      next: (user) => {
        if (['Caixa', 'Gerente', 'Admin'].includes(user.type)) {
          console.log('Usuário autorizado:', user.username);
          this.dialogRef.close(user.username);  // Fecha o diálogo passando o nome de usuário autorizado
        } else {
          this.errorMessage = 'Usuário não autorizado para abrir o PDV.';
        }
      },
      error: (error) => {
        this.errorMessage = 'Falha na autenticação. Verifique suas credenciais.';
        console.error('Erro de autenticação:', error);
      }
    });
  }
}
