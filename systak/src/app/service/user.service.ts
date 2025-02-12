import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  is_superuser: boolean;
  is_staff: boolean;
  is_active: boolean;
  date_joined: Date;
  last_login: Date | null;
  type: string;
}

export interface UserCreate {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  is_superuser: boolean;
  is_staff: boolean;
  is_active: boolean;
  date_joined: Date;
  last_login: Date | null;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiURL}/`;  // Certifique-se de que esta URL corresponde ao padrão do seu backend

  constructor(private http: HttpClient) {}

  load(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + 'users/');
  }

  get(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}users/${id}/`);
  }

  addUser(user: UserCreate): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}create-user/`, user);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}users/${id}/`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}users/${id}/`);
  }

  checkUsernameAvailability(username: string): Observable<{ available: boolean }> {
    return this.http.get<{ available: boolean }>(`${this.apiUrl}check-username/`, {
      params: { username }
    });
  }
}

