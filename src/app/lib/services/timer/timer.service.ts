import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppTheme, ThemeService } from '../theme';

@Injectable({
    providedIn: 'root',
})
export class TimerService {
    // Constants
    public readonly focusMode: string = 'focus';
    public readonly shortBreakMode: string = 'short-break';
    public readonly longBreakMode: string = 'long-break';

    private _baseTime = new BehaviorSubject<number>(120);
    private _time = new BehaviorSubject<number>(this._baseTime.getValue());
    private _mode = new BehaviorSubject<string>(this.focusMode);
    baseTime$: Observable<number> = this._baseTime.asObservable();
    time$: Observable<number> = this._time.asObservable();
    mode$: Observable<string> = this._mode.asObservable();

    private _timer: ReturnType<typeof setInterval> | null = null;

    constructor(private _themeService: ThemeService) {}

    setTime(t: number): void {
        this._time.next(t);
    }

    getTime(): number {
        return this._time.getValue();
    }

    setBaseTime(t: number): void {
        this._baseTime.next(t);
    }

    getBaseTime(): number {
        return this._baseTime.getValue();
    }

    setMode(m: string): void {
        this._mode.next(m);
        this._themeService.setTheme(m as AppTheme);
    }

    getMode(): string {
        return this._mode.getValue();
    }

    toggleTimer(): void {
        if (!this._timer) {
            this._timer = setInterval(() => {
                if (this._time.getValue() != 0) {
                    this._time.next(this._time.getValue() - 1);
                }
            }, 1000);
        } else {
            clearInterval(this._timer);
            this._timer = null;
        }
    }

    isTimerRunning(): boolean {
        return this._timer != null;
    }
}
