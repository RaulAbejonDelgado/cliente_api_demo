import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerilComponent } from './peril.component';

describe('PerilComponent', () => {
  let component: PerilComponent;
  let fixture: ComponentFixture<PerilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
