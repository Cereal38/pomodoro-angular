import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@lib/services';
import { TimerService } from '@lib/services/timer/timer.service';
import { LogoComponent } from '../logo/logo.component';
import { SettingsButtonComponent } from '../settings-button/settings-button.component';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, RouterModule, LogoComponent, SettingsButtonComponent],
    templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
    private readonly _router = inject(Router);
    private readonly _authService = inject(AuthService);

    time!: number;

    constructor(private _timerService: TimerService, private _cdr: ChangeDetectorRef) {}

    ngOnInit(): void {
        // Subscribe to the timer service
        this._timerService.time$.subscribe((t) => {
            this.time = t;
            this._cdr.detectChanges(); // Trigger changes on the interface
        });
    }

    onClickSignOut(): void {
        this._authService.logout();
        this._router.navigate(['/auth/login']);
    }
}
