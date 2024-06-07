import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerInputPanelComponent } from './player-input-panel.component';

describe('PlayerInputPanelComponent', () => {
  let component: PlayerInputPanelComponent;
  let fixture: ComponentFixture<PlayerInputPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerInputPanelComponent]
    });
    fixture = TestBed.createComponent(PlayerInputPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
