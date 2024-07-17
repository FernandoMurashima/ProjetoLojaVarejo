import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

interface AuthData {
  token: string;
}

interface User {
  id: number;
  username: string;
  type: string; // Adicionando o campo type ao modelo de usuário
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null;
  private tokenKey = 'authToken';
  private authStatus = new BehaviorSubject<boolean>(this.hasToken());
  private user: User | null = null; // Adicionando um campo para armazenar os dados do usuário

  constructor(private http: HttpClient) {
    this.token = sessionStorage.getItem(this.tokenKey);
    if (this.token) {
      this.loadUserData().subscribe();
    }
  }

  logout() {
    sessionStorage.removeItem(this.tokenKey);
    this.token = null;
    this.user = null;
    this.authStatus.next(false);
    console.log('Usuário deslogado');
  }

  public getToken(): string | null {
    return this.token;
  }

  public clearToken(): void {
    this.token = null;
    sessionStorage.removeItem(this.tokenKey);
  }

  public isAuthenticated(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  public authenticate(username: string, password: string): Observable<any> {
    const url = `${environment.apiURL}/api-token-auth/`;
    const data = { username, password };
    return this.http.post<AuthData>(url, data).pipe(map((response) => {
      this.setToken(response.token);
      return this.loadUserData(); // Carregar dados do usuário após autenticação
    }));
  }

  private setToken(value: string): void {
    this.token = value;
    sessionStorage.setItem(this.tokenKey, this.token);
    this.authStatus.next(true);
    console.log('Token armazenado no sessionStorage:', this.token); // Log para verificar o token
  }

  private hasToken(): boolean {
    return !!sessionStorage.getItem(this.tokenKey);
  }

  private loadUserData(): Observable<User> {
    const url = `${environment.apiURL}/users/me/`; // Ajustado para o endpoint correto
    return this.http.get<User>(url).pipe(map((user) => {
      this.user = user;
      console.log('Dados do usuário carregados:', this.user); // Log para verificar os dados do usuário
      return user;
    }));
  }

  public getUser(): User | null {
    console.log('Obtendo usuário:', this.user); // Log para verificar o usuário retornado
    return this.user;
  }

  public refreshUserData(): Observable<User> {
    return this.loadUserData(); // Método público para carregar dados do usuário
  }
}
