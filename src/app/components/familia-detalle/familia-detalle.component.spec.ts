import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamiliaDetalleComponent } from './familia-detalle.component';

describe('FamiliaDetalleComponent', () => {
  let component: FamiliaDetalleComponent;
  let fixture: ComponentFixture<FamiliaDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamiliaDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamiliaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
