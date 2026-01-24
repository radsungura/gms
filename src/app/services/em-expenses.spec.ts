import { TestBed } from '@angular/core/testing';

import { EmExpenses } from './em-expenses';

describe('EmExpenses', () => {
  let service: EmExpenses;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmExpenses);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
