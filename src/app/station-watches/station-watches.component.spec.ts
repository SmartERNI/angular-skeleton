import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StationWatchesComponent} from './station-watches.component';
import {Clock} from '../model/clock';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('StationWatchesComponent', () => {
    let component: StationWatchesComponent;
    let fixture: ComponentFixture<StationWatchesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StationWatchesComponent],
            imports: [HttpClientTestingModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StationWatchesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    function getClocks(): Clock[] {
        const clock1 = {
            name: 'Lausanne',
            isLit: true
        } as Clock;
        const clock2 = {
            name: 'Bern',
            isLit: true
        } as Clock;
        const clock3 = {
            name: 'Lausanne',
            isLit: false
        } as Clock;
        const clock4 = {
            name: 'Bern',
            isLit: true
        } as Clock;
        const clock5 = {
            name: 'Aarau',
            isLit: false
        } as Clock;

        const clocksArray = [] as Clock[];
        clocksArray.push(clock1, clock2, clock3, clock4, clock5);
        return clocksArray;
    }

    function getSortedClocks(): Clock[] {
        const clock1 = {
            name: 'Lausanne',
            isLit: true
        } as Clock;
        const clock2 = {
            name: 'Bern',
            isLit: true
        } as Clock;
        const clock3 = {
            name: 'Lausanne',
            isLit: false
        } as Clock;
        const clock4 = {
            name: 'Bern',
            isLit: true
        } as Clock;
        const clock5 = {
            name: 'Aarau',
            isLit: false
        } as Clock;

        const clocksArray = [] as Clock[];
        clocksArray.push(clock5, clock2, clock4, clock1, clock3);
        return clocksArray;
    }
});
