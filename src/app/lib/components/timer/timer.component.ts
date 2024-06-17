import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-timer',
    standalone: true,
    imports: [],
    templateUrl: './timer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerComponent {
    // Constants
    public readonly focusMode: number = 0;
    public readonly shortBreakMode: number = 1;
    public readonly longBreakMode: number = 2;

    private _mode: number = this.focusMode;

    handleModeChange(mode: number): void {
        console.log('Theme changed to : ', mode);
        this._mode = mode;
    }

    get mode(): number {
        return this._mode;
    }
}
