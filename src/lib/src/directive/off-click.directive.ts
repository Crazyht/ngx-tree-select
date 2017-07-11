import { Directive, HostListener, Input, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Directive({
    selector: '[cra-off-click]'
})
export class OffClickDirective implements OnInit, OnDestroy {
    /* tslint:disable */
    @Input('cra-off-click')
    public offClickHandler: any;
    /* tslint:enable */

    constructor(@Inject(PLATFORM_ID) private platformId: string) {}

    public ngOnInit(): any {
        if (isPlatformBrowser(this.platformId)) {
            setTimeout(() => { document.addEventListener('click', this.offClickHandler); }, 0);
        }
    }

    public ngOnDestroy(): any {
        if (isPlatformBrowser(this.platformId)) {
            document.removeEventListener('click', this.offClickHandler);
        }
    }
}
