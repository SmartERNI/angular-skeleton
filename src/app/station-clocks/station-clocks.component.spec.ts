import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StationClocksComponent} from './station-clocks.component';
import {Clock} from '../model/clock';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ClocksView} from '../model/clocks-view';

describe('StationClocksComponent', () => {
    let component: StationClocksComponent;
    let fixture: ComponentFixture<StationClocksComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StationClocksComponent],
            imports: [HttpClientTestingModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StationClocksComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should correctly filter non lit clocks', () => {
        expect(component.filterNonLitClocks(getClocks())).toEqual(getLitClocks());
    });

    it('should correctly accumulate all clocks by name and generate an array of ClocksView', () => {
        expect(component.accumulateClocksByNameAndGenerateClocksView(getLitClocks())).toEqual(getAccumulatedClocksViews());
    });

    it('should correctly sort the ClocksView array by number descending', () => {
        expect(component.sortClocksViewsByNumberDescending(getAccumulatedClocksViews())).toEqual(getSortedClocksViews());
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

    function getLitClocks(): Clock[] {
        const clock1 = {
            name: 'Lausanne',
            isLit: true
        } as Clock;
        const clock2 = {
            name: 'Bern',
            isLit: true
        } as Clock;
        const clock3 = {
            name: 'Bern',
            isLit: true
        } as Clock;

        const clocksArray = [] as Clock[];
        clocksArray.push(clock1, clock2, clock3);
        return clocksArray;
    }

    function getAccumulatedClocksViews(): ClocksView[] {
        const clocksView1 = new ClocksView();
        clocksView1.name = 'Lausanne';
        clocksView1.number = 1;
        const clocksView2 = new ClocksView();
        clocksView2.name = 'Bern';
        clocksView2.number = 2;

        const clocksViewArray = [] as ClocksView[];
        clocksViewArray.push(clocksView1, clocksView2);
        return clocksViewArray;
    }

    function getSortedClocksViews(): ClocksView[] {
        const clocksView1 = new ClocksView();
        clocksView1.name = 'Bern';
        clocksView1.number = 2;
        const clocksView2 = new ClocksView();
        clocksView2.name = 'Lausanne';
        clocksView2.number = 1;

        const clocksViewArray = [] as ClocksView[];
        clocksViewArray.push(clocksView1, clocksView2);
        return clocksViewArray;
    }
});
