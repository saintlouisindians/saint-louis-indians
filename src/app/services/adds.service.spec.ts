import { TestBed, inject } from '@angular/core/testing';

import { AddsService } from './adds.service';

describe('AddsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddsService]
    });
  });

  it('should be created', inject([AddsService], (service: AddsService) => {
    expect(service).toBeTruthy();
  }));
});
