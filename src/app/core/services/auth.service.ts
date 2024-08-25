import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
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
  private _currentUser = signal<User | null>(null);
  public isAuthenticated = computed<boolean>(() => !!this.currentToken());
  public userRole = computed<string>(() => this._currentUser()?.role ?? '');
  constructor() {
    this._currentToken.set(localStorage.getItem('token') ?? '');
    const user = (JSON.parse(localStorage.getItem('user')!) as User) ?? null;
    this._currentUser.set(user);
  }

  login(email: string, password: string): Observable<UserLoginResponse> {
    return this.http
      .post<UserLoginResponse>(`${this.base_url}/login`, {
        email,
        password,
      })
      .pipe(
        map((response) => {
          this.setUserLogged(response.user);
          this.setToken(response.token);
          return response;
        })
      );
  }

  private setToken(token: string) {
    this._currentToken.set(token);
    localStorage.setItem('token', token);
  }

  private setUserLogged(user: User | null) {
    this._currentUser.set(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  public loguout(): void {
    this.setToken('');
    this.setUserLogged(null);
  }
}
