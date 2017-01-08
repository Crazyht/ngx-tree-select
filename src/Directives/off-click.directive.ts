import { Directive, HostListener, Input, OnInit, OnDestroy } from '@angular/core';

@Directive({
    selector: '[cra-off-click]'
})
export class OffClickDirective implements OnInit, OnDestroy {
    /* tslint:disable */
    @Input('cra-off-click')
    public offClickkHandler: any;
    /* tslint:enable */
    @HostListener('click', ['$event'])
    public onClick($event: MouseEvent): void {
        $event.stopPropagation();
    }

    public ngOnInit(): any {
        setTimeout(() => { document.addEventListener('click', this.offClickkHandler); }, 0);
    }

    public ngOnDestroy(): any {
        document.removeEventListener('click', this.offClickkHandler);
    }
}
