import { Component, forwardRef, Input, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { SelectableItem } from '../selectable-item';
import { SelectService } from '../Services/select.service';
import { SelectOption } from '../Models/SelectOption';

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TreeSelectComponent),
    multi: true
};

@Component({
    selector: 'cra-select',
    template: require('./select.component.html'),
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, SelectService]
})
export class TreeSelectComponent implements ControlValueAccessor {
    private _isOpen = false;
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;
    private haveFocus = false;

    @Input()
    public set items(value: any[]) {
        this.svc.setItems(value);
    }

    @Input()
    public set idField(value: string) {
        this.svc.setConfiguration( opt => opt.idProperty = value, true);
    }

    @Input()
    public set textField(value: string) {
        this.svc.setConfiguration( opt => opt.textProperty = value, true);
    }

    @Input()
    public set childrenField(value: string) {
        this.svc.setConfiguration( opt => opt.childProperty = value, true);
    }

    @Input()
    public set  multiple(value: boolean) {
        this.svc.setConfiguration( opt => opt.allowMultiple = value, true);
    }

    public get multiple(): boolean {
        return this.svc.Configuration.allowMultiple;
    }

    public get internalItems(): SelectableItem[] {
        return this.svc.getInternalItems() || [];
    }

    public get selection(): SelectableItem[] {
        return this.svc.getInternalSelection();
    }


    public constructor(
        private svc: SelectService
    ) {
        this.clickedOutside = this.clickedOutside.bind(this);

        this.svc.configurationChanged$.subscribe(options => {
        });
        this.svc.itemsChanged$.subscribe(items => {
            this.onChangeCallback(this.svc.getSelection());
        });
        this.svc.itemSelectionChanged$.subscribe(items => {
        });
    }

    keyUp($event: any) { }

    toggle($event: any) {
        $event.preventDefault();
        this.haveFocus = true;
        this.svc.toggleOpen();
    }

    public removeItem($event: any, item: SelectableItem): void {
        $event.stopPropagation();
        this.svc.toggleItemSelection(item);
    }
    public get isOpen(): boolean {
        return this.svc.Configuration.isOpen;
    }

    clickedOutside() {
        if (!this.haveFocus) {
            this.onTouched();
        }
        this.haveFocus = false;
    }

    // Set touched on blur
    @HostListener('blur')
    onTouched() {
        this.svc.close();
        this.onTouchedCallback();
    }

    // Placeholders for the callbacks which are later provided by the Control Value Accessor
    writeValue(value: any) {
        this.svc.setSelection(value);
    }

    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }
}
