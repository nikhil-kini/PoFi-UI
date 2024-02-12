import { TestBed } from '@angular/core/testing';

import { CommonService } from './common.service';
import { Suit } from 'src/app/model/cards.model';

describe('CommonServiceService', () => {
  let service: CommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('createCardStackOfSuit() method test', () => {
    expect(service.createCardStackOfSuit(Suit.CLUB).length)
      .withContext('method test')
      .toEqual(13);
  });

  it('createDeck() method test', () => {
    expect(service.createDeck().length).withContext('method test').toEqual(52);
  });
});
