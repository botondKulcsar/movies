import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeChild2Component } from './welcome-child2.component';

describe('WelcomeChild2Component', () => {
  let component: WelcomeChild2Component;
  let fixture: ComponentFixture<WelcomeChild2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeChild2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeChild2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
