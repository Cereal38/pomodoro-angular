import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TimerService {
    private _baseTime = new BehaviorSubject<number>(120);
    private _time = new BehaviorSubject<number>(this._baseTime.getValue());
    baseTime$: Observable<number> = this._baseTime.asObservable();
    time$: Observable<number> = this._time.asObservable();

    private _timer: ReturnType<typeof setInterval> | null = null;

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

    isTimerRuuning(): boolean {
        return this._timer != null;
    }
}
