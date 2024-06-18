import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TimerService {
    // private _time = new BehaviorSubject<number>(25 * 60);
    private _time = new BehaviorSubject<number>(10);
    time$: Observable<number> = this._time.asObservable();

    private _timer: ReturnType<typeof setInterval> | null = null;

    setTime(t: number): void {
        this._time.next(t);
    }

    getTime(): number {
        return this._time.getValue();
    }

    toggleTimer(): void {
        console.log('TOGGLE');
        if (!this._timer) {
            this._timer = setInterval(() => {
                this._time.next(this._time.getValue() - 1);
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
