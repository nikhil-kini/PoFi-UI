import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  passwordMatchValidator,
  patternValidator,
} from 'src/app/commons/service/custom-validators';
import { User } from 'src/app/model/user.model';
import { CognitoService } from 'src/app/service/cognito.service';

@Component({
  selector: 'pofri-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  hide = true;
  re_hide = true;
  signUpForm!: FormGroup;
  verifyForm!: FormGroup;
  loading = false;
  isConfirm = false;
  user?: User;

  constructor(
    private fb: FormBuilder,
    private cognitoService: CognitoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.signUpForm = this.fb.group(
      {
        name: ['', [Validators.required]],
        emailId: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            // check whether the entered password has a number
            patternValidator(/\d/, {
              hasNumber: true,
            }),
            // check whether the entered password has upper case letter
            patternValidator(/[A-Z]/, {
              hasCapitalCase: true,
            }),
            // check whether the entered password has a lower case letter
            patternValidator(/[a-z]/, {
              hasSmallCase: true,
            }),
            // check whether the entered password has a special character
            patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, {
              hasSpecialCharacters: true,
            }),
            Validators.minLength(8),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      {
        // check whether our password and confirm password match
        validator: passwordMatchValidator,
      }
    );
    this.verifyForm = new FormGroup({
      code: new FormControl('', [Validators.required]),
    });
  }

  public signUp(): void {
    this.user = {
      name: this.signUpForm.value.name,
      email: this.signUpForm.value.emailId,
      password: this.signUpForm.value.password,
    };
    this.loading = true;
    this.cognitoService
      .signUp(this.user!)
      .then(() => {
        this.loading = false;
        this.isConfirm = true;
      })
      .catch(() => {
        this.loading = false;
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
      .catch(() => {
        this.loading = false;
      });
  }
}
