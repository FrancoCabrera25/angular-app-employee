import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  User,
  UserLoginResponse,
} from '../../shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private base_url = `${environment.API_EMPLOYEE}/auth`;

  private _currentToken = signal<string>('');
  public currentToken = this._currentToken.asReadonly();
  private currentUser = signal<User | null>(null);

  constructor() {
    this.setToken(localStorage.getItem('token') ?? '');
  }

  login(email: string, password: string): Observable<UserLoginResponse> {
    return this.http
      .post<UserLoginResponse>(`${this.base_url}/login`, {
        email,
        password,
      })
      .pipe(
        map((response) => {
          this.currentUser.set(response.user);
          this.setToken(response.token);
          return response;
        })
      );
  }

  private setToken(token: string) {
    this._currentToken.set(token);
    localStorage.setItem('token', token);
  }
}
