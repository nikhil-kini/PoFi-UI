import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseURL = 'http://localhost:8082/api/v1';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor(private httpClient: HttpClient) {}

  getPreflopDecision(data: any): Observable<any> {
    return this.httpClient.post(baseURL + '/preflop/decision', data);
  }

  getPostflopDecision(data: any): Observable<any> {
    return this.httpClient.post(baseURL + '/postflop/decision', data);
  }

  getHandCateory(data: any): Observable<any> {
    return this.httpClient.post(baseURL + '/preflop/handCategory', data);
  }

  getHandCombination(data: any): Observable<any> {
    return this.httpClient.post(baseURL + '/postflop/handCombination', data);
  }

  getClientInformation(clientId: any): Observable<any> {
    return this.httpClient.get(
      'https://nzi6n6jqjl.execute-api.ap-northeast-1.amazonaws.com/read-client/' +
        clientId
    );
  }

  proceedToCheckout(data: any) {
    return this.httpClient.post(
      'https://nzi6n6jqjl.execute-api.ap-northeast-1.amazonaws.com/create-checkout-session',
      data
    );
  }
}
