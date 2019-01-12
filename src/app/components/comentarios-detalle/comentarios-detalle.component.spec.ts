import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentariosDetalleComponent } from './comentarios-detalle.component';

describe('ComentariosDetalleComponent', () => {
  let component: ComentariosDetalleComponent;
  let fixture: ComponentFixture<ComentariosDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComentariosDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComentariosDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
