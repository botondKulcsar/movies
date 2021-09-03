import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviePostsTableComponent } from './movie-posts-table.component';

describe('MoviePostsTableComponent', () => {
  let component: MoviePostsTableComponent;
  let fixture: ComponentFixture<MoviePostsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviePostsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviePostsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
