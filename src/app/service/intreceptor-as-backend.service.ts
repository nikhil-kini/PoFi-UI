import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

const urls = [
  {
    url: '/preflop/decision',
    json: {
      decisionResults: ['Mock1', 'Mock2'],
    },
  },
  {
    url: '/postflop/decision',
    json: {
      decisionResults: ['Mock1', 'Mock2'],
    },
  },
  {
    url: '/preflop/handCategory',
    json: {
      handCategoryResult: 'Mock Hand',
    },
  },
  {
    url: '/postflop/handCombination',
    json: {
      completeHandCombinations: ['Mock Combination'],
    },
  },
];

@Injectable({
  providedIn: 'root',
})
export class IntreceptorAsBackendService implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    for (const ele of urls) {
      if (req.url.endsWith(ele.url) && true) {
        return of(new HttpResponse({ status: 200, body: ele.json }));
      }
    }
    return next.handle(req);
  }
}
