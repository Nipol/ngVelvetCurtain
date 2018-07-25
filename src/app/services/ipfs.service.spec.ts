import { TestBed, inject } from '@angular/core/testing';

import { IPFSService } from './ipfs.service';

describe('IPFSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IPFSService]
    });
  });

  it('should be created', inject([IPFSService], (service: IPFSService) => {
    expect(service).toBeTruthy();
  }));
});
