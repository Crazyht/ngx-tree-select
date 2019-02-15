import {
    Directive,
    ElementRef,
    HostListener,
    Inject,
    AfterViewInit,
    Input,
    Output,
    EventEmitter,
    PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


@Directive({
    selector: '[off-focus]'
})
export class OffFocusDirective {

    @Input('off-focus') public type:any;
    @Output() onSelect: EventEmitter<any> = new EventEmitter();
    public elem:any;


    constructor( @Inject(PLATFORM_ID) private platformId: string, private el: ElementRef) {}


    public ngAfterViewInit() {
        switch (this.type) {
            case 'dropdown':
                this.focusDropdown();
                break;
            case 'button':
                this.focusNextItem();
                break;

        }
    }

    public focusDropdown() {

        if (isPlatformBrowser(this.platformId)) {
                this.elem = this.el.nativeElement;
                var dropdown = this.elem.previousElementSibling.previousElementSibling;
                this.elem.addEventListener('keyup', function(event){
                    if (event.keyCode === 27) {
                        dropdown.focus();
                    }
                });
            }
    }

    public focusNextItem() {

        if (isPlatformBrowser(this.platformId)) {

            this.elem = this.el.nativeElement;
            var onselect = this.onSelect;
            var nextItem = this.elem.parentElement.parentElement.nextElementSibling;

            this.elem.addEventListener('keyup', function(event) {
                var dropdown = this.parentElement.parentElement.parentElement.parentElement.parentElement;
                if (event.keyCode === 32) {
                    (nextItem) ? nextItem.children[0].querySelector('.close').focus() : dropdown.querySelector('.caret').focus();
                    onselect.emit(this);
                }
            })

        }

    }


}

