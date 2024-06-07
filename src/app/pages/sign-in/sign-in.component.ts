import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/service/auth.service';
import { CognitoService } from 'src/app/service/cognito.service';

@Component({
  selector: 'pofri-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  hide = true;
  loading = false;
  user!: User;

  constructor(
    private cognitoService: CognitoService,
    private router: Router,
    private authService: AuthService
  ) {}

  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  public signIn(): void {
    this.loading = true;
    this.user = {
      email: this.signInForm.value.email!,
      password: this.signInForm.value.password!,
    };
    this.authService.login();
    // this.router.navigate(['lobby']);
    this.cognitoService
      .signIn(this.user)
      .then(() => {
        this.router.navigate(['/lobby']);
      })
      .catch(() => {
        this.loading = false;
      });
  }
}
