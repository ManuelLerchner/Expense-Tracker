import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';

import { first, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private userSubject!: BehaviorSubject<User>;
  public user!: Observable<User>;

  public get userValue(): User {
    return this.userSubject.value;
  }

  public get isLoggedIn(): boolean {
    return !!this.userValue;
  }

  constructor(private http: HttpClient, private router: Router) {
    let authToken = localStorage.getItem('authToken');
    let user = localStorage.getItem('user');

    if (authToken && user) {
      this.checkIfKeepSignedIn(authToken, JSON.parse(user)).subscribe(
        (user: User) => {
          this.userSubject.next(user);
          this.user = this.userSubject.asObservable();
          router.navigate(['/home']);
        },
        (error) => {}
      );
    }

    this.userSubject = new BehaviorSubject<User>(null as unknown as User);
    this.user = this.userSubject.asObservable();
  }

  login(email: string, password: string, rememberMe: boolean) {
    return this.http
      .post<User>(`${environment.apiUrl}/auth/login`, {
        email,
        password,
        rememberMe,
      })
      .pipe(
        map((user: User) => {
          if (rememberMe) {
            localStorage.setItem('authToken', user.authToken);
            localStorage.setItem('user', JSON.stringify(user));
          }
          this.userSubject.next(user as User);
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    this.userSubject.next(null as unknown as User);
  }

  register(email: string, username: string, password: string) {
    return this.http.post(`${environment.apiUrl}/auth/register`, {
      email,
      username,
      password,
    });
  }

  checkIfKeepSignedIn(authToken: string, user: User) {
    return this.http.post<User>(`${environment.apiUrl}/auth/keep-signed-in`, {
      authToken,
      user,
    });
  }
}