import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-timer',
    standalone: true,
    imports: [],
    templateUrl: './timer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerComponent {}
