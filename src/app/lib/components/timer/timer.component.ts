import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-timer',
    standalone: true,
    imports: [],
    templateUrl: './timer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerComponent implements OnInit {
    // Constants
    public readonly focusMode: number = 0;
    public readonly shortBreakMode: number = 1;
    public readonly longBreakMode: number = 2;

    mode!: number;

    // Init mode on mount
    ngOnInit(): void {
        this.mode = this.focusMode;
    }

    handleModeChange(mode: number): void {
        console.log('Theme changed to : ', mode);
        this.mode = mode;
    }
}
