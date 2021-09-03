import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeChild3Component } from './welcome-child3.component';

describe('WelcomeChild3Component', () => {
  let component: WelcomeChild3Component;
  let fixture: ComponentFixture<WelcomeChild3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeChild3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeChild3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
