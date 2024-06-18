import { DOCUMENT } from '@angular/common';
import { Injectable, OnDestroy, inject } from '@angular/core';
import { DEFAULT_BASE_THEME } from '@lib/constants';
import { storage } from '@lib/utils';
import { BehaviorSubject, Subject, fromEventPattern } from 'rxjs';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { AppTheme } from './theme.config';

@Injectable({
    providedIn: 'root',
})
export class ThemeService implements OnDestroy {
    currentTheme$ = new BehaviorSubject<AppTheme | null>(this._storedTheme);

    private readonly _document = inject(DOCUMENT);

    private readonly _destroy$ = new Subject();

    private readonly _mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    public get currentTheme(): AppTheme | null {
        return this.currentTheme$.getValue();
    }

    public get systemTheme(): AppTheme {
        return this._mediaQuery.matches ? 'dark' : 'light';
    }

    private get _storedTheme(): AppTheme | null {
        return storage.getItem('appTheme');
    }

    private set _storedTheme(theme: AppTheme | null) {
        storage.setItem('appTheme', theme as AppTheme);
    }

    ngOnDestroy(): void {
        this._destroy$.complete();
        this._destroy$.unsubscribe();
    }

    init(): void {
        this.setTheme(this._storedTheme || DEFAULT_BASE_THEME);
        this._listenForMediaQueryChanges();
    }

    /**
     * Manually changes theme in LocalStorage & HTML body
     *
     * @param theme new theme
     */
    setTheme(theme: AppTheme): void {
        this._clearThemes();
        this._storedTheme = theme;

        let bodyClass = theme;
        this.currentTheme$.next(bodyClass);

        if (theme === 'system') {
            bodyClass = this.systemTheme;
        }
        console.log('Theme new : ', bodyClass);
        this._document.body.classList.add(bodyClass);
    }

    /**
     * Handles system theme changes & applies theme automatically
     *
     */
    private _listenForMediaQueryChanges(): void {
        fromEventPattern<MediaQueryListEvent>(
            this._mediaQuery.addListener.bind(this._mediaQuery),
            this._mediaQuery.removeListener.bind(this._mediaQuery),
        )
            .pipe(takeUntil(this._destroy$))
            .subscribe(() => {
                // Only applies changes when the current theme is "system"
                if (this._storedTheme === 'system') {
                    this.setTheme('system');
                }
            });
    }

    /**
     * Clears all themes in ThemeList enum from the HTML element
     *
     */
    private _clearThemes(): void {
        this._document.body.classList.remove('system', 'light', 'dark', 'focus', 'short-break', 'long-break');
    }

    primaryBgClass$ = this.currentTheme$.pipe(
        map((theme) => {
            switch (theme) {
                case 'focus':
                    return 'bg-primary-focus';
                case 'short-break':
                    return 'bg-primary-short-break';
                case 'long-break':
                    return 'bg-primary-long-break';
                default:
                    return '';
            }
        }),
        distinctUntilChanged(),
    );

    secondaryBgClass$ = this.currentTheme$.pipe(
        map((theme) => {
            switch (theme) {
                case 'focus':
                    return 'bg-secondary-focus';
                case 'short-break':
                    return 'bg-secondary-short-break';
                case 'long-break':
                    return 'bg-secondary-long-break';
                default:
                    return '';
            }
        }),
        distinctUntilChanged(),
    );

    tertiaryBgClass$ = this.currentTheme$.pipe(
        map((theme) => {
            switch (theme) {
                case 'focus':
                    return 'bg-tertiary-focus';
                case 'short-break':
                    return 'bg-tertiary-short-break';
                case 'long-break':
                    return 'bg-tertiary-long-break';
                default:
                    return '';
            }
        }),
        distinctUntilChanged(),
    );
}
