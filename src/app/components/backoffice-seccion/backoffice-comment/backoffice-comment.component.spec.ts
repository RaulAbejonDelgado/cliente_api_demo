import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackofficeCommentComponent } from './backoffice-comment.component';

describe('BackofficeCommentComponent', () => {
  let component: BackofficeCommentComponent;
  let fixture: ComponentFixture<BackofficeCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackofficeCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackofficeCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
