import { Component, HostListener, OnInit } from '@angular/core';
import { AppTheme, ThemeService } from '@lib/services/theme';
import { TimerService } from '@lib/services/timer/timer.service';
import { Subject, takeUntil } from 'rxjs';

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

    currentTheme!: AppTheme | null;
    private readonly _destroy$ = new Subject();

    mode!: number;
    time!: number; // In seconds

    constructor(private _timerService: TimerService, private _themeService: ThemeService) {}

    // Init mode on mount
    ngOnInit(): void {
        this.mode = this.focusMode;

        // Subscribe to the timer service
        this._timerService.time$.subscribe((t) => {
            this.time = t;
        });

        this._themeService.currentTheme$
            .pipe(takeUntil(this._destroy$))
            .subscribe((theme) => (this.currentTheme = theme));
    }

    handleModeChange(mode: number): void {
        console.log('Mode changed to : ', mode);
        switch (mode) {
            case this.focusMode:
                this._themeService.setTheme('focus');
                break;
            case this.shortBreakMode:
                this._themeService.setTheme('short-break');
                break;
            case this.longBreakMode:
                this._themeService.setTheme('long-break');
                break;
        }

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

    get bgSecondaryClassName(): string {
        switch (this.currentTheme) {
            case 'focus':
                return 'bg-secondary-focus';
            case 'short-break':
                return 'bg-secondary-short-break';
            case 'long-break':
                return 'bg-secondary-long-break';
            default:
                return '';
        }
    }
}
