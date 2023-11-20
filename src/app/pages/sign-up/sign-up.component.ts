import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  passwordMatchValidator,
  patternValidator,
} from 'src/app/commons/service/custom-validators';

@Component({
  selector: 'pofri-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  hide = true;
  re_hide = true;
  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

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
  }
}
