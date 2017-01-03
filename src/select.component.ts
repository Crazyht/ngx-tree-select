import { Component, forwardRef, Input, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { SelectableItem } from './selectable-item';

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
<div tabindex="0" (keyup)="keyUp($event)" [cra-OffClick]="clickedOutside" class="ui-select-container dropdown open">
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
            <cra-select-item [item]="o"></cra-select-item>

        </li>
    </ul>
</div>
`,
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class TreeSelectComponent implements ControlValueAccessor {
    @Input()
    public multiple: boolean = false;
    private _childrenField: string = '';
    private _idField: string = '';
    private _textField: string = '';
    private _isOpen = false;
    private _items: any[] = [];
    private _model: any[] | any;
    private internalItems: SelectableItem[] = [];
    private selection: SelectableItem[] = [];
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    @Input()
    public set items(value: any[]) {
        this._items = value;
        this.changeInputParameters();
    }
    @Input()
    public set idField(value: string) {
        this._idField = value;
        this.changeInputParameters();
    }
    @Input()
    public set textField(value: string) {
        this._textField = value;
        this.changeInputParameters();
    }
    @Input()
    public set childrenField(value: string) {
        this._childrenField = value;
        this.changeInputParameters();
    }

    keyUp($event: any) { }

    open($event: any) {
        // $event.preventDefault();
        this._isOpen = true;
    }

    public get isOpen(): boolean {
        return this._isOpen;
    }

    private modifySelection(): void {
        console.log('Start modifySelection');
        this.selection = this.getSelectedItems(this.internalItems);
        console.log('End modifySelection');
    }

    private getSelectedItems(array: SelectableItem[]): SelectableItem[] {
        let res: SelectableItem[] = [];
        array.forEach(v => {
            if (v.children && v.children.length > 0) {
                res = [...res, ...this.getSelectedItems(v.children)];
            } else if (v.selected === true) {
                res.push(v);
            }
        });
        return res;
    }
    private get isHierarchic(): boolean {
        return (this._childrenField && this._childrenField.trim().length > 0);
    }

    private changeInputParameters(): void {
        this.internalItems = [];

        if (!this._idField || this._idField.trim().length === 0) {
            return;
        } else if (!this._textField || this._textField.trim().length === 0) {
            return;
        } else if (!this._items || !Array.isArray(this._items)) {
            return;
        }

        this.internalItems = this.transformItems(this._items);
        this.changeSelection();
    }

    // Recursive copy items to internal items
    private transformItems(sources: any[]): SelectableItem[] {
        if (sources && Array.isArray(sources)) {
            return sources.map((srcItem) => {
                let item = new SelectableItem(
                        <string>srcItem[this._idField],
                        <string>srcItem[this._textField],
                        srcItem
                    );
                if (this.isHierarchic) {
                    item.children = this.transformItems(srcItem[this._childrenField]);
                }
                return item;
            });
        }

        return [];
    }

    private changeSelection() {
        try {
            if (!this._idField || this._idField.trim().length === 0) {
                return;
            }

            let model: any[];
            if (!this._model) {
                model = [];
            } else if (!Array.isArray(this._model)) {
                model = [this._model];
            } else {
                model = this._model;
            }
            let select: SelectableItem[] = [];
            model.forEach(v => {
                select = [...select, ...this.getItemForModel(v, this.internalItems)];
            });
            select.forEach(v => v.selected = true);
            this.modifySelection();
        } catch (error) {
            console.error('Error while changeSelection : ', error);
        }
    }

    private getItemForModel(value: any, array: SelectableItem[]): SelectableItem[] {
        let result: SelectableItem[] = [];
        array.forEach(v => {
            if (v.id === value[this._idField]) {
                result.push(v);
            }
            if (this.isHierarchic && v.children && v.children.length > 0) {
                result = [...result, ...this.getItemForModel(value, v.children)];
            }
        });
        return result;
    }

    // Set touched on blur
    @HostListener('blur')
    onTouched() {
        this.onTouchedCallback();
    }

    // Placeholders for the callbacks which are later provided by the Control Value Accessor
    writeValue(value: any) {
        if (value !== this._model) {
            this._model = value;
            this.changeSelection();
        }
    }

    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }
}
