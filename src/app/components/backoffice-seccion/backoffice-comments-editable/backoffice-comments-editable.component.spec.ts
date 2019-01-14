import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackofficeCommentsEditableComponent } from './backoffice-comments-editable.component';

describe('BackofficeCommentsEditableComponent', () => {
  let component: BackofficeCommentsEditableComponent;
  let fixture: ComponentFixture<BackofficeCommentsEditableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackofficeCommentsEditableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackofficeCommentsEditableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
