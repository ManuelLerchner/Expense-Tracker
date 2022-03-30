import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../shared.style.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {}

  registerPassword1: string = '';
  registerPassword2: string = '';
  registerEmail: string = '';
  registerUsername: string = '';
  registerRememberMe: boolean = false;

  responseText: string = '';
  responseStatus: 'error' | 'success' | '' = '';

  async onRegister() {
    if (
      !this.registerPassword1 ||
      !this.registerPassword2 ||
      !this.registerEmail ||
      !this.registerUsername
    ) {
      this.responseText = 'Please fill in all fields.';
      this.responseStatus = 'error';
      return;
    }

    if (this.registerPassword1 !== this.registerPassword2) {
      this.responseText = 'Passwords do not match.';
      this.responseStatus = 'error';
      return;
    }

    try {
      await this.accountService
        .register(
          this.registerEmail,
          this.registerUsername,
          this.registerPassword1
        )
        .toPromise();

      this.responseStatus = 'success';
      this.responseText = 'Registration successful';

      await sleep(500);

      await this.accountService
        .login(
          this.registerEmail,
          this.registerPassword1,
          this.registerRememberMe
        )
        .toPromise();

      this.responseStatus = 'success';
      this.responseText = 'Login successful';
      this.router.navigate(['/home']);
    } catch (error: any) {
      console.log(error);

      this.responseStatus = 'error';

      if (typeof error.error === 'string') {
        this.responseText = error.error;
      } else {
        this.responseText = 'An unknown error occured.';
      }
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
function sleep(time: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
