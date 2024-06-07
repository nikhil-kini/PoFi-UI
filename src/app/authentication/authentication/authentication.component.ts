import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import {
  passwordMatchValidator,
  patternValidator,
} from 'src/app/commons/service/custom-validators';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/service/auth.service';
import { CognitoService } from 'src/app/service/cognito.service';

@Component({
  selector: 'pofri-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent {
  hide = true;
  loading = false;
  isConfirm = false;
  re_hide = true;
  user?: User;

  constructor(
    private cognitoService: CognitoService,
    private router: Router,
    private authService: AuthService
  ) {}

  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  signUpForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      emailId: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        // check whether the entered password has a number
        patternValidator(/\d/, {
          hasNumber: true,
        }).bind(this),
        // check whether the entered password has upper case letter
        patternValidator(/[A-Z]/, {
          hasCapitalCase: true,
        }).bind(this),
        // check whether the entered password has a lower case letter
        patternValidator(/[a-z]/, {
          hasSmallCase: true,
        }).bind(this),
        // check whether the entered password has a special character
        patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, {
          hasSpecialCharacters: true,
        }).bind(this),
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    {
      validators: passwordMatchValidator,
    }
  );

  verifyForm = new FormGroup({
    code: new FormControl('', [Validators.required]),
  });

  public signIn(): void {
    this.loading = true;
    this.user = {
      email: this.signInForm.value.email!,
      password: this.signInForm.value.password!,
    };
    this.authService.login();
    this.router.navigate(['lobby']);
    // this.cognitoService
    //   .signIn(this.user)
    //   .then(() => {
    //     this.router.navigate(['/lobby']);
    //   })
    //   .catch((e) => {
    //     this.loading = false;
    //     alert(e);
    //   });
  }

  public signUp(): void {
    this.user = {
      name: this.signUpForm.value.name!,
      email: this.signUpForm.value.emailId!,
      password: this.signUpForm.value.password!,
    };
    this.loading = true;
    this.cognitoService
      .signUp(this.user!)
      .then(() => {
        this.loading = false;
        this.isConfirm = true;
      })
      .catch((e) => {
        this.loading = false;
        alert(e);
      });
    console.log(this.user);
  }

  public confirmSignUp(): void {
    this.loading = true;
    this.user!.code = this.verifyForm.value.code!;
    console.log(this.user);
    this.cognitoService
      .confirmSignUp(this.user!)
      .then(() => {
        this.router.navigate(['/sign-in']);
      })
      .catch((e) => {
        this.loading = false;
        alert(e);
      });
  }
}
