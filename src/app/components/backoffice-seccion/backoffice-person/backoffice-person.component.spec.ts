import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackofficePersonComponent } from './backoffice-person.component';

describe('BackofficePersonComponent', () => {
  let component: BackofficePersonComponent;
  let fixture: ComponentFixture<BackofficePersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackofficePersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackofficePersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
