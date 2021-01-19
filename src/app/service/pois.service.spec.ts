import { TestBed } from '@angular/core/testing';

import { PoisService } from './pois.service';

describe('PoisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PoisService = TestBed.get(PoisService);
    expect(service).toBeTruthy();
  });
});
