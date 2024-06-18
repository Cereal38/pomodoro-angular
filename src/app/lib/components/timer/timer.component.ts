import { Component, HostListener, OnInit } from '@angular/core';
import { TimerService } from '@lib/services/timer/timer.service';

@Component({
    selector: 'app-timer',
    standalone: true,
    imports: [],
    templateUrl: './timer.component.html',
})
export class TimerComponent implements OnInit {
    // Constants
    public readonly focusMode: number = 0;
    public readonly shortBreakMode: number = 1;
    public readonly longBreakMode: number = 2;

    mode!: number;
    time!: number; // In seconds

    constructor(private _timerService: TimerService) {}

    // Init mode on mount
    ngOnInit(): void {
        this.mode = this.focusMode;

        // Subscribe to the timer service
        this._timerService.time$.subscribe((t) => {
            this.time = t;
        });
    }

    handleModeChange(mode: number): void {
        console.log('Theme changed to : ', mode);
        this.mode = mode;
    }

    get formattedTime(): string {
        return `${Math.floor(this.time / 60)}:${String(this.time % 60).padStart(2, '0')}`;
    }

    // Pause and play timer and space press
    @HostListener('document:keypress', ['$event'])
    handleKeyDown(event: KeyboardEvent): void {
        if (event.code == 'Space') {
            this.handleStart();
        }
    }

    handleStart(): void {
        this._timerService.toggleTimer();
    }

    get isTimerRunning(): boolean {
        return this._timerService.isTimerRuuning();
    }
}
