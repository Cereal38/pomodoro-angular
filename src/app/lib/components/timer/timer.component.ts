import { Component, HostListener, OnInit } from '@angular/core';

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

    private _timer: ReturnType<typeof setInterval> | null = null;

    mode!: number;
    time!: number; // In seconds

    // Init mode on mount
    ngOnInit(): void {
        this.mode = this.focusMode;
        this.time = 25 * 60;
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
        if (!this._timer) {
            this._timer = setInterval(() => {
                console.log('HELLLO');
                this.time--;
            }, 1000);
        } else {
            clearInterval(this._timer);
            this._timer = null;
        }
    }

    get isTimerRunning(): boolean {
        return this._timer !== null;
    }
}
