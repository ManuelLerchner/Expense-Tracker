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
  registerRememberMe: boolean = true;

  responseText: string = '';

  onRegister() {
    if (
      !this.registerPassword1 ||
      !this.registerPassword2 ||
      !this.registerEmail ||
      !this.registerUsername
    ) {
      this.responseText = 'Please fill in all fields.';
      return;
    }

    if (this.registerPassword1 !== this.registerPassword2) {
      this.responseText = 'Passwords do not match.';
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
          console.log('success register');

          this.accountService
            .login(
              this.registerEmail,
              this.registerPassword1,
              this.registerRememberMe
            )
            .pipe(first())
            .subscribe({
              next: (data: User) => {
                console.log('success');
                this.router.navigate(['/home']);
              },
              error: (error: any) => {
                console.log('error');
                this.responseText = 'Error Logging in.';
              },
            });
        },
        error: (error: any) => {
          console.log('error register');
          this.responseText =
            'The email address is already in use by another account.';
        },
      });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
