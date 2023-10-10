import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSelectionWindowComponent } from './card-selection-window.component';

describe('CardSelectionWindowComponent', () => {
  let component: CardSelectionWindowComponent;
  let fixture: ComponentFixture<CardSelectionWindowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardSelectionWindowComponent]
    });
    fixture = TestBed.createComponent(CardSelectionWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
