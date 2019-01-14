import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackofficeFamilyDetailComponent } from './backoffice-family-detail.component';

describe('BackofficeFamilyDetailComponent', () => {
  let component: BackofficeFamilyDetailComponent;
  let fixture: ComponentFixture<BackofficeFamilyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackofficeFamilyDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackofficeFamilyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
