import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { HttpClientService } from './http-client.service';

describe('HttpClientService', () => {
  let service: HttpClientService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  const baseURL = 'http://localhost:8082/api/v1';
  const testPostData: any = { name: 'Test Data Post' };
  const testResultData: any = { name: 'Test Data' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(HttpClientService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getPreflopDecision() test', () => {
    service.getPreflopDecision(testPostData).subscribe((data) => {
      expect(data).withContext('check req result').toEqual(testResultData);
    });

    const req = httpTestingController.expectOne(baseURL + '/preflop/decision');

    expect(req.request.method).toEqual('POST');

    req.flush(testResultData);
  });

  it('getPostflopDecision() test', () => {
    service.getPostflopDecision(testPostData).subscribe((data) => {
      expect(data).withContext('check req result').toEqual(testResultData);
    });

    const req = httpTestingController.expectOne(baseURL + '/postflop/decision');

    expect(req.request.method).toEqual('POST');

    req.flush(testResultData);
  });

  it('getHandCateory() test', () => {
    service.getHandCateory(testPostData).subscribe((data) => {
      expect(data).withContext('check req result').toEqual(testResultData);
    });

    const req = httpTestingController.expectOne(
      baseURL + '/preflop/handCategory'
    );

    expect(req.request.method).toEqual('POST');

    req.flush(testResultData);
  });

  it('getHandCombination() test', () => {
    service.getHandCombination(testPostData).subscribe((data) => {
      expect(data).withContext('check req result').toEqual(testResultData);
    });

    const req = httpTestingController.expectOne(
      baseURL + '/postflop/handCombination'
    );

    expect(req.request.method).toEqual('POST');

    req.flush(testResultData);
  });

  it('getClientInformation() test', () => {
    service.getClientInformation(123).subscribe((data) => {
      expect(data).withContext('check req result').toEqual(testResultData);
    });

    const req = httpTestingController.expectOne(
      'https://nzi6n6jqjl.execute-api.ap-northeast-1.amazonaws.com/read-client/123'
    );

    expect(req.request.method).toEqual('GET');

    req.flush(testResultData);
  });

  it('proceedToCheckout() test', () => {
    service.proceedToCheckout(testPostData).subscribe((data) => {
      expect(data).withContext('check req result').toEqual(testResultData);
    });

    const req = httpTestingController.expectOne(
      'https://nzi6n6jqjl.execute-api.ap-northeast-1.amazonaws.com/create-checkout-session'
    );

    expect(req.request.method).toEqual('POST');

    req.flush(testResultData);
  });
});
