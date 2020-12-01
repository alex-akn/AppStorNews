import { TestBed } from '@angular/core/testing';

import { TopResolverService } from './top-resolver.service';

describe('TopResolverService', () => {
  let service: TopResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
