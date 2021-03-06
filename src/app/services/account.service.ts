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
    this.userSubject = new BehaviorSubject<User>(null as unknown as User);
    this.user = this.userSubject.asObservable();
  }

  async keepSignedIn(returnUrl: string) {
    let localUserData = localStorage.getItem('user');

    if (localUserData) {
      let localUserDataJson = JSON.parse(localUserData);

      try {
        let user = await this.http
          .post<User>(`${environment.apiUrl}/auth/keep-signed-in`, {
            user: localUserDataJson,
          })
          .toPromise();

        this.userSubject.next(user as User);
        this.user = this.userSubject.asObservable();

        this.router.navigate([returnUrl]);
      } catch (error: any) {
        console.log(error.statusText);
      }
    }
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
            localStorage.setItem('user', JSON.stringify(user));
          }
          this.userSubject.next(user as User);
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null as unknown as User);
  }

  register(email: string, username: string, password: string) {
    return this.http.post(`${environment.apiUrl}/auth/register`, {
      email,
      username,
      password,
    });
  }
}
