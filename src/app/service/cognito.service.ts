import { Inject, Injectable, InjectionToken } from '@angular/core';
import { User } from '../model/user.model';
import { BehaviorSubject } from 'rxjs';
import { Amplify } from 'aws-amplify';
import { environment } from 'src/environments/environment';
import * as authAWS from 'aws-amplify/auth';

@Injectable({
  providedIn: 'root',
})
export class CognitoService {
  private authenticationSubject: BehaviorSubject<any>;
  constructor(@Inject(AWS_AMPLIFY_AUTH) private auth: typeof authAWS) {
    Amplify.configure({
      Auth: { Cognito: environment.cognito },
    });

    this.authenticationSubject = new BehaviorSubject<boolean>(false);
  }

  public signUp(user: User): Promise<any> {
    return this.auth.signUp({
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
    return this.auth.confirmSignUp({
      username: user.email,
      confirmationCode: user.code!,
    });
  }

  public signIn(user: User): Promise<any> {
    return this.auth.signIn({ username: user.email, password: user.password });
    // .then(() => {
    //   this.authenticationSubject.next(true);
    // });
  }

  public signOut(): Promise<any> {
    return this.auth.signOut();
    // .then(() => {
    //   this.authenticationSubject.next(false);
    // });
  }

  public isAuthenticated(): boolean {
    return this.authenticationSubject.value;
  }

  public getUser(): Promise<any> {
    return this.auth.getCurrentUser();
  }

  // public updateUser(user: User): Promise<any> {
  //   return Auth.currentUserPoolUser().then((cognitoUser: any) => {
  //     return Auth.updateUserAttributes(cognitoUser, user);
  //   });
  // }
}

export const AWS_AMPLIFY_AUTH = new InjectionToken('AWS_AMPLIFY_AUTH', {
  factory: () => authAWS,
  providedIn: 'root',
});
