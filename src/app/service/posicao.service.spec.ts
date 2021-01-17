import { TestBed } from '@angular/core/testing';

import { PosicaoService } from './posicao.service';

describe('PosicaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PosicaoService = TestBed.get(PosicaoService);
    expect(service).toBeTruthy();
  });
});
