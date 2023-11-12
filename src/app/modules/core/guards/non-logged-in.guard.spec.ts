import { TestBed } from '@angular/core/testing';

import { NonLoggedInGuard } from './non-logged-in.guard';

describe('NonLoggedInGuard', () => {
  let guard: NonLoggedInGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NonLoggedInGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
