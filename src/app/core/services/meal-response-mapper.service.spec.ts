import { TestBed } from '@angular/core/testing';

import { MealResponseMapperService } from './meal-response-mapper.service';

describe('HttpMapperService', () => {
  let service: MealResponseMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MealResponseMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
