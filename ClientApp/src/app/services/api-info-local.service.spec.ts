import { TestBed } from '@angular/core/testing';

import { ApiInfoLocalService } from './api-info-local.service';

describe('ApiInfoLocalService', () => {
  let service: ApiInfoLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiInfoLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
