import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackofficeFamilyComponent } from './backoffice-family.component';

describe('BackofficeFamilyComponent', () => {
  let component: BackofficeFamilyComponent;
  let fixture: ComponentFixture<BackofficeFamilyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackofficeFamilyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackofficeFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
