import { TestBed } from '@angular/core/testing';

import { FamilysService } from './familys.service';

describe('FamilysService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FamilysService = TestBed.get(FamilysService);
    expect(service).toBeTruthy();
  });
});
