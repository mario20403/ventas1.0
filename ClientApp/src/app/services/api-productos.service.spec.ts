import { TestBed } from '@angular/core/testing';

import { ApiProductosService } from './api-productos.service';

describe('ApiProductosService', () => {
  let service: ApiProductosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiProductosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
