import { TestBed } from '@angular/core/testing';

import { OnlineGuard } from './online.guard';

describe('OnlineGuard', () => {
  let guard: OnlineGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OnlineGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
