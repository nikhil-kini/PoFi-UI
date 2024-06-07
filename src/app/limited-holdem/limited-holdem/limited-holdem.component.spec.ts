import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitedHoldemComponent } from './limited-holdem.component';

describe('LimitedHoldemComponent', () => {
  let component: LimitedHoldemComponent;
  let fixture: ComponentFixture<LimitedHoldemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LimitedHoldemComponent]
    });
    fixture = TestBed.createComponent(LimitedHoldemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
