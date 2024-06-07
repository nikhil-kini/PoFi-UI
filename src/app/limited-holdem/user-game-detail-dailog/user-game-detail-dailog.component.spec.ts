import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGameDetailDailogComponent } from './user-game-detail-dailog.component';

describe('UserGameDetailDailogComponent', () => {
  let component: UserGameDetailDailogComponent;
  let fixture: ComponentFixture<UserGameDetailDailogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserGameDetailDailogComponent]
    });
    fixture = TestBed.createComponent(UserGameDetailDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
