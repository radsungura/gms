import { TestBed } from '@angular/core/testing';

import { Refunds } from './refunds';

describe('Refunds', () => {
  let service: Refunds;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Refunds);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
