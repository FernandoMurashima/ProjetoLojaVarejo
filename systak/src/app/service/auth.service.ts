import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

interface AuthData {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null;
  private tokenKey = 'authToken';
  private authStatus = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {
    this.token = sessionStorage.getItem(this.tokenKey);
  }

  logout() {
    sessionStorage.removeItem(this.tokenKey);
    this.token = null;
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
      return;
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
}

