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
  successful: boolean = false;

  onRegister() {
    if (
      !this.registerPassword1 ||
      !this.registerPassword2 ||
      !this.registerEmail ||
      !this.registerUsername
    ) {
      this.responseText = 'Please fill in all fields.';
      this.successful = false;
      return;
    }

    if (this.registerPassword1 !== this.registerPassword2) {
      this.responseText = 'Passwords do not match.';
      this.successful = false;
      return;
    }

    this.accountService
      .register(
        this.registerEmail,
        this.registerUsername,
        this.registerPassword1
      )
      .pipe(first())
      .subscribe({
        next: () => {
          this.successful = true;
          this.responseText = 'Registration successful.';

          this.accountService
            .login(
              this.registerEmail,
              this.registerPassword1,
              this.registerRememberMe
            )
            .pipe(first())
            .subscribe({
              next: (data: User) => {
                this.successful = true;
                this.responseText = 'Login successful.';

                this.router.navigate(['/home']);
              },
              error: (error: any) => {
                console.log(error);
                this.successful = false;
                this.responseText = error.error;
              },
            });
        },
        error: (error: any) => {
          console.log(error);
          if (typeof error.error === 'string') {
            this.responseText = error.error;
          } else {
            this.responseText = 'An unknown error occured.';
          }
        },
      });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
