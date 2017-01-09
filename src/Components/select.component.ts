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
    template: `
<div tabindex="0" (keyup)="keyUp($event)" [cra-off-click]="clickedOutside" class="ui-select-container dropdown open">
    <div [ngClass]="{'ui-disabled': disabled}"></div>
    <!-- Control display -->
    <div class="ui-select-match">
        <span tabindex="-1"
              class="btn btn-default btn-secondary form-control ui-select-toggle"
              (click)="toggle($event)"
              style="outline: 0;">
            <span *ngIf="selection.length <= 0" class="ui-select-placeholder text-muted">{{placeholder}}</span>
            <span *ngFor="let itm of selection" class="pull-left"
                  [ngClass]="{'ui-select-match-text': !multiple, 'ui-select-match-item btn btn-default btn-xs': multiple}">
                {{itm.text}}
                <a *ngIf="multiple" class="close" style="margin-left: 5px; padding: 0;" (click)="removeItem($event, itm)">x</a>
            </span>
            <i class="dropdown-toggle pull-right"></i>
            <i class="caret pull-right"></i>
        </span>
    </div>
    <!-- options template -->
    <ul *ngIf="isOpen && internalItems && internalItems.length > 0"
        class="ui-select-choices dropdown-menu"
        role="menu">
        <li *ngFor="let o of internalItems" role="menuitem">
            <cra-select-item [item]="o" (selected)="itemSelected()"></cra-select-item>
        </li>
    </ul>
</div>
`,
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, SelectService]
})
export class TreeSelectComponent implements ControlValueAccessor {
    private _isOpen = false;
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    @Input()
    public set items(value: any[]) {
        this.svc.setItems(value);
    }

    @Input()
    public set idField(value: string) {
        this.svc.setConfiguration( opt => opt.idProperty = value);
    }

    @Input()
    public set textField(value: string) {
        this.svc.setConfiguration( opt => opt.textProperty = value);
    }

    @Input()
    public set childrenField(value: string) {
        this.svc.setConfiguration( opt => opt.childProperty = value);
    }

    @Input()
    public set  multiple(value: boolean) {
        this.svc.setConfiguration( opt => opt.allowMultiple = value);
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
        this.onTouched();
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
