import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThemeService } from '@lib/services/theme';

@Component({
    selector: 'app-settings-button',
    standalone: true,
    imports: [],
    templateUrl: './settings-buttons.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsButtonComponent {
    constructor(public themeService: ThemeService) {}
}
