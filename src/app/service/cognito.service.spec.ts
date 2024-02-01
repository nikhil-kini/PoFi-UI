import { TestBed } from '@angular/core/testing';

import { AWS_AMPLIFY_AUTH, CognitoService } from './cognito.service';
import { User } from '../model/user.model';

fdescribe('CognitoService', () => {
  let service: CognitoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CognitoService, // <- add it
        {
          provide: AWS_AMPLIFY_AUTH, // <- add a mock
          useValue: {
            signUp: () =>
              Promise.resolve({
                name: 'signUp',
              }),
            confirmSignUp: () =>
              Promise.resolve({
                name: 'confirmSignUp',
              }),
            signIn: () =>
              Promise.resolve({
                name: 'signIn',
              }),
            signOut: () =>
              Promise.resolve({
                name: 'signOut',
              }),
            getCurrentUser: () =>
              Promise.resolve({
                name: 'getCurrentUser',
              }),
          },
        },
      ],
    });
    service = TestBed.inject(CognitoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('signUp() test', (done: DoneFn) => {
    let user: User = {
      email: 'string',
      password: 'string',
      code: 'string',
      name: 'string',
    };

    service.signUp(user).then((data) => {
      expect(data.name).withContext('signUP() test').toEqual('signUp');
    });
    done();
  });

  it('confirmSignUp() test', (done: DoneFn) => {
    let user: User = {
      email: 'string',
      password: 'string',
      code: 'string',
      name: 'string',
    };
    service.confirmSignUp(user).then((data) => {
      expect(data.name)
        .withContext('confirmSignUp() test')
        .toEqual('confirmSignUp');
    });
    done();
  });

  it('signIn() test', (done: DoneFn) => {
    let user: User = {
      email: 'string',
      password: 'string',
      code: 'string',
      name: 'string',
    };
    service.signIn(user).then((data) => {
      expect(data.name).withContext('signIn() test').toEqual('signIn');
    });
    done();
  });

  it('signOut() test', (done: DoneFn) => {
    service.signOut().then((data) => {
      expect(data.name).withContext('signOut() test').toEqual('signOut');
    });
    done();
  });

  it('isAuthenticated() test', () => {
    expect(service.isAuthenticated())
      .withContext('isAuthenticated() test')
      .toEqual(false);
  });

  it('getUser() test', (done: DoneFn) => {
    service.getUser().then((data) => {
      expect(data.name).withContext('getUser() test').toEqual('getCurrentUser');
    });
    done();
  });
});
