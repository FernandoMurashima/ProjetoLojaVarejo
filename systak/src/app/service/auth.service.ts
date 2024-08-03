import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Observable, BehaviorSubject, of } from 'rxjs';

interface AuthData {
  token: string;
}

interface User {
  id: number;
  username: string;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null;
  private tokenKey = 'authToken';
  private authStatus = new BehaviorSubject<boolean>(this.hasToken());
  private currentUser: User | null = null;

  constructor(private http: HttpClient) {
    this.token = sessionStorage.getItem(this.tokenKey);
    if (this.token) {
      this.loadUserData().subscribe();
    }
  }

  logout() {
    sessionStorage.removeItem(this.tokenKey);
    this.token = null;
    this.currentUser = null;
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

  public authenticate(username: string, password: string): Observable<User> {
    const url = `${environment.apiURL}/api-token-auth/`;
    const data = { username, password };
    return this.http.post<AuthData>(url, data).pipe(
      switchMap(response => {
        this.setToken(response.token);
        return this.loadUserData();
      }),
      catchError(error => {
        console.error('Erro de autenticação no serviço:', error);
        return of(null as any);
      })
    );
  }

  private setToken(value: string): void {
    this.token = value;
    sessionStorage.setItem(this.tokenKey, this.token);
    this.authStatus.next(true);
    console.log('Token armazenado no sessionStorage:', this.token);
  }

  private hasToken(): boolean {
    return !!sessionStorage.getItem(this.tokenKey);
  }

  private loadUserData(): Observable<User> {
    const url = `${environment.apiURL}/users/me/`;
    return this.http.get<User>(url).pipe(
      map(user => {
        this.currentUser = user;
        console.log('Dados do usuário carregados:', this.currentUser);
        return user;
      }),
      catchError(error => {
        console.error('Erro ao carregar dados do usuário:', error);
        return of(null as any);
      })
    );
  }

  public refreshUserData(): Observable<User> {
    return this.loadUserData();
  }

  public getCurrentUser(): User | null {
    return this.currentUser;
  }
}
