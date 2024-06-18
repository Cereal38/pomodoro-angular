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
    currentTheme!: AppTheme | null;

    mode!: string;
    time!: number; // In seconds

    constructor(public timerService: TimerService, public themeService: ThemeService) {}

    // Init mode on mount
    ngOnInit(): void {
        // Subscribe to the timer service
        this.timerService.time$.subscribe((t) => {
            this.time = t;
        });

        this.timerService.mode$.subscribe((m) => {
            this.mode = m;
        });
    }

    get formattedTime(): string {
        return `${String(Math.floor(this.time / 60)).padStart(2, '0')}:${String(this.time % 60).padStart(2, '0')}`;
    }

    // Pause and play timer and space press
    @HostListener('document:keypress', ['$event'])
    handleKeyDown(event: KeyboardEvent): void {
        if (event.code == 'Space') {
            this.timerService.toggleTimer();
        }
    }
}
