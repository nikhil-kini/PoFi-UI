import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import { MatCard, MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule, FormsModule],
      declarations: [SignUpComponent],
    });
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
