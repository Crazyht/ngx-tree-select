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
              (click)="open($event)"
              style="outline: 0;">
            <span *ngIf="selection.length <= 0" class="ui-select-placeholder text-muted">{{placeholder}}</span>
            <span *ngIf="!multiple && selection.length > 0" class="ui-select-match-text pull-left">{{selection[0].text}}</span>
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
    public set  multiple(value:boolean) {
        this.svc.setConfiguration( opt => opt.allowMultiple = value);
    }

    public get internalItems(): SelectableItem[] {
        return this.svc.items;
    }

    public constructor(
        private svc: SelectService
    ) {
    }

    ngInit() {
        this.svc.configurationChanged$.subscribe(options=> {
            if (options.isValid()) {
                //this.changeInputParameters();
            }
        });
        this.svc.itemsChanged$.subscribe(items=> {

        });
        this.svc.itemSelectionChanged$.subscribe(items=> {

        });
    }

    keyUp($event: any) { }

    open($event: any) {
        // $event.preventDefault();
        this._isOpen = true;
    }

    public get isOpen(): boolean {
        return this._isOpen;
    }

    private changeSelection() {
        try {
            
            if (!this.svc.Configuration.idProperty || this.svc.Configuration.idProperty.trim().length === 0) {
                return;
            }

            let model: any[];
            if (!this.svc.Configuration.model) {
                model = [];
            } else if (!Array.isArray(this.svc.Configuration.model)) {
                model = [this.svc.Configuration.model];
            } else {
                model = this.svc.Configuration.model;
            }
            let select: SelectableItem[] = [];
            model.forEach(v => {
                select = [...select, ...this.getItemForModel(v, this.internalItems)];
            });
            select.forEach(v => v.selected = true);
            //this.modifySelection();
        } catch (error) {
            console.error('Error while changeSelection : ', error);
        }
    }

    private getItemForModel(value: any, array: SelectableItem[]): SelectableItem[] {
        let result: SelectableItem[] = [];
        array.forEach(v => {
            if (v.id === value[this.svc.Configuration.idProperty]) {
                result.push(v);
            }
            if (this.svc.Configuration.isHierarchy() && v.children && v.children.length > 0) {
                result = [...result, ...this.getItemForModel(value, v.children)];
            }
        });
        return result;
    }

    // Set touched on blur
    @HostListener('blur')
    onTouched() {
        this._isOpen = false;
        this.onTouchedCallback();
    }

    // Placeholders for the callbacks which are later provided by the Control Value Accessor
    writeValue(value: any) {
        if (value !== this.svc.Configuration.model) {
            this.svc.setConfiguration(opt => opt.model = value);
        }
    }

    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }
}
