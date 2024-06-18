import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { AppTheme, ThemeService } from '@lib/services/theme';
import { TimerService } from '@lib/services/timer/timer.service';

@Component({
    selector: 'app-timer',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './timer.component.html',
})
export class TimerComponent implements OnInit {
    // Constants
    public readonly focusMode: number = 0;
    public readonly shortBreakMode: number = 1;
    public readonly longBreakMode: number = 2;

    currentTheme!: AppTheme | null;

    mode!: number;
    time!: number; // In seconds

    constructor(public timerService: TimerService, public themeService: ThemeService) {}

    // Init mode on mount
    ngOnInit(): void {
        this.mode = this.focusMode;

        // Subscribe to the timer service
        this.timerService.time$.subscribe((t) => {
            this.time = t;
        });
    }

    handleModeChange(mode: number): void {
        console.log('Mode changed to : ', mode);
        switch (mode) {
            case this.focusMode:
                this.themeService.setTheme('focus');
                break;
            case this.shortBreakMode:
                this.themeService.setTheme('short-break');
                break;
            case this.longBreakMode:
                this.themeService.setTheme('long-break');
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
            this.timerService.toggleTimer();
        }
    }
}
