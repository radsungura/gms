import { TestBed } from '@angular/core/testing';

import { EmFunds } from './em-funds';

describe('EmFunds', () => {
  let service: EmFunds;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmFunds);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
