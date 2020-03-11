import {Component, OnInit} from '@angular/core';
import {ClocksService} from '../service/clocks.service';
import {take} from 'rxjs/operators';
import {Clock} from '../model/clock';
import {ClocksView} from '../model/clocks-view';
import {faCaretDown, faCaretUp} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-station-clocks',
    templateUrl: './station-clocks.component.html',
    styleUrls: ['./station-clocks.component.scss']
})
export class StationClocksComponent implements OnInit {

    public isLoadingData: boolean;
    public isLoadingError: boolean;
    public allClocks: Clock[];
    public sortedFilteredAccumulatedClocks: ClocksView[];
    public faCaretDown = faCaretDown;
    public faCaretUp = faCaretUp;
    public sortByNameDescending: boolean;
    public sortByNumberDescending: boolean;

    constructor(private clocksService: ClocksService) {
    }

    ngOnInit(): void {
        this.isLoadingData = true;
        this.isLoadingError = false;
        this.sortedFilteredAccumulatedClocks = [];
        this.sortByNameDescending = true;
        this.sortByNumberDescending = true;
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

    sortByName(): void {
        this.sortedFilteredAccumulatedClocks.sort((a, b) => {
            if (a.name === b.name) {
                return 0;
            } else {
                if (this.sortByNameDescending) {
                    return a.name.localeCompare(b.name);
                } else {
                    return b.name.localeCompare(a.name);
                }
            }
        });
        this.sortByNameDescending = !this.sortByNameDescending;
    }

    sortByNumber(): void {
        this.sortedFilteredAccumulatedClocks.sort((a, b) => {
            if (a.number === b.number) {
                return 0;
            } else {
                if (this.sortByNumberDescending) {
                    return a.number - b.number;
                } else {
                    return b.number - a.number;
                }
            }
        });
        this.sortByNumberDescending = !this.sortByNumberDescending;
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
