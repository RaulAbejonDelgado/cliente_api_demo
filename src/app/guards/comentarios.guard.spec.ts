import { TestBed, async, inject } from '@angular/core/testing';

import { ComentariosGuard } from './comentarios.guard';

describe('ComentariosGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComentariosGuard]
    });
  });

  it('should ...', inject([ComentariosGuard], (guard: ComentariosGuard) => {
    expect(guard).toBeTruthy();
  }));
});
