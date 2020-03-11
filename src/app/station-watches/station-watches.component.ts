import {Component, OnInit} from '@angular/core';
import {ClocksService} from '../service/clocks.service';
import {take} from 'rxjs/operators';
import {Clock} from '../model/clock';
import {ClocksView} from '../model/clocks-view';

@Component({
    selector: 'app-station-watches',
    templateUrl: './station-watches.component.html',
    styleUrls: ['./station-watches.component.scss']
})
export class StationWatchesComponent implements OnInit {

    public isLoadingData: boolean;
    public isLoadingError: boolean;
    public allClocks: Clock[];
    public sortedFilteredAccumulatedClocks: ClocksView[];

    constructor(private clocksService: ClocksService) {
    }

    ngOnInit(): void {
        this.isLoadingData = true;
        this.isLoadingError = false;
        this.sortedFilteredAccumulatedClocks = [];
        this.loadData();
    }

    loadData(): void {
        this.clocksService.getAllData().pipe(take(1))
            .subscribe((clocks: Clock[]) => {
                this.allClocks = clocks;
                this.sortedFilteredAccumulatedClocks = this.getSortedClockView();
                this.isLoadingData = false;
                this.isLoadingError = false;
            }, () => {
                this.isLoadingData = false;
                this.isLoadingError = true;
            });
    }

    filterNonLitClocks(clocks: Clock[]): Clock[] {
        let clocksCopy = Array.from(clocks);
        clocksCopy = clocksCopy.filter(this.isLit);
        return clocksCopy;
    }

    accumulateClocksByNameAndGenerateClocksView(clocks: Clock[]): ClocksView[] {
        const clocksViews = [] as ClocksView[];
        clocks.forEach(clock => {
            if (clocksViews.find(c => c.name === clock.name)) {
                clocksViews.find(c => c.name === clock.name).number += 1;
            } else {
                const clocksView = new ClocksView();
                clocksView.name = clock.name;
                clocksView.number = 1;
                clocksViews.push(clocksView);
            }
        });
        return clocksViews;
    }

    sortClocksViewsByNumberDescending(clocksViews: ClocksView[]): ClocksView[] {
        return clocksViews.sort((a, b) => {
            if (a.number === b.number) {
                return 0;
            } else {
                return b.number - a.number;
            }
        });
    }

    private getSortedClockView(): ClocksView[] {
        const onlyLitClocks = this.filterNonLitClocks(this.allClocks);
        const accumulatedClocks = this.accumulateClocksByNameAndGenerateClocksView(onlyLitClocks);
        return this.sortClocksViewsByNumberDescending(accumulatedClocks);
    }

    private isLit(element: Clock) {
        return element.isLit;
    }
}
