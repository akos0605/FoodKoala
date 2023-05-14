import { TestBed } from '@angular/core/testing';

import { NegatedAuthGuard } from './negated-auth.guard';

describe('NegatedAuthGuard', () => {
  let guard: NegatedAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NegatedAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
