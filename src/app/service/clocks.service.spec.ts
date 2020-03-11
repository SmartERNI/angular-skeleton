import {TestBed} from '@angular/core/testing';

import {ClocksService} from './clocks.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ExampleServiceService', () => {
    let service: ClocksService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        service = TestBed.inject(ClocksService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
