import { TestBed } from '@angular/core/testing';

import { ExampleServiceService } from './example-service.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ExampleServiceService', () => {
  let service: ExampleServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ExampleServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
