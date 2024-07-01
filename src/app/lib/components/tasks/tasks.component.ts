import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ThemeService } from '@lib/services';

@Component({
    selector: 'app-tasks',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './tasks.component.html',
})
export class TasksComponent {
    constructor(public themeService: ThemeService) {}
}
