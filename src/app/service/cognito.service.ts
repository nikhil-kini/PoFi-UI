import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { BehaviorSubject } from 'rxjs';
import { Amplify } from 'aws-amplify';
import { environment } from 'src/environments/environment';
import {
  AuthUser,
  confirmSignUp,
  getCurrentUser,
  signIn,
  signOut,
  signUp,
} from 'aws-amplify/auth';

@Injectable({
  providedIn: 'root',
})
export class CognitoService {
  private authenticationSubject: BehaviorSubject<any>;

  constructor() {
    Amplify.configure({
      Auth: { Cognito: environment.cognito },
    });

    this.authenticationSubject = new BehaviorSubject<boolean>(false);
  }

  public signUp(user: User): Promise<any> {
    return signUp({
      username: user.email,
      password: user.password,
      options: {
        userAttributes: {
          name: user.name,
        },
      },
    });
  }

  public confirmSignUp(user: User): Promise<any> {
    return confirmSignUp({
      username: user.email,
      confirmationCode: user.code!,
    });
  }

  public signIn(user: User): Promise<any> {
    return signIn({ username: user.email, password: user.password }).then(
      () => {
        this.authenticationSubject.next(true);
      }
    );
  }

  public signOut(): Promise<any> {
    return signOut().then(() => {
      this.authenticationSubject.next(false);
    });
  }

  public isAuthenticated(): boolean {
    return this.authenticationSubject.value;
  }

  public getUser(): Promise<any> {
    return getCurrentUser();
  }

  // public updateUser(user: User): Promise<any> {
  //   return Auth.currentUserPoolUser().then((cognitoUser: any) => {
  //     return Auth.updateUserAttributes(cognitoUser, user);
  //   });
  // }
}
