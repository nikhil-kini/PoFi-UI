import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NlHoldemComponent } from './nl-holdem.component';

describe('NlHoldemComponent', () => {
  let component: NlHoldemComponent;
  let fixture: ComponentFixture<NlHoldemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NlHoldemComponent]
    });
    fixture = TestBed.createComponent(NlHoldemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
