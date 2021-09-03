import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeChild1Component } from './welcome-child1.component';

describe('WelcomeChild1Component', () => {
  let component: WelcomeChild1Component;
  let fixture: ComponentFixture<WelcomeChild1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeChild1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeChild1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
