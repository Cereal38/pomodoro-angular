import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-settings-button',
    standalone: true,
    imports: [],
    templateUrl: './settings-buttons.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsButtonComponent {}
