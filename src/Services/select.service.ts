import { Subject } from 'rxjs/Rx';
import { SelectableItem } from '../selectable-item';
import { SelectOption } from '../Models/SelectOption';
import { Injectable } from '@angular/core';



export interface OptionDelegate {
    (options: SelectOption): void;
}

@Injectable()
export class SelectService {
    private _items: SelectableItem[];
    private _options: SelectOption = new SelectOption();

    public itemSelectionChanged$: Subject<SelectableItem> = new Subject<SelectableItem>();
    public itemsChanged$: Subject<SelectableItem[]> = new Subject<SelectableItem[]>();
    public configurationChanged$: Subject<SelectOption> = new Subject<SelectOption>();
    public modelChanged$: Subject<any> = new Subject<any>();

    public close(): void {
        if (this.Configuration.isOpen) {
            this.setConfiguration(opt => opt.isOpen = false);
        }
    }

    public open(): void {
        if (!this.Configuration.isOpen) {
            this.setConfiguration(opt => opt.isOpen = true);
        }
    }

    public toggleOpen(): void {
        this.setConfiguration(opt => opt.isOpen = !opt.isOpen);
    }

    public setItems(value: any[]) {
        this.setConfiguration(opt => opt.items = value);
    }

    public getInternalItems(): SelectableItem[] {
        return this._items;
    }

    public setSelection(values: any | any[]): void {
        this.Configuration.model = values;
    }

    public getSelection(): any | any[] {
        if (this.Configuration.allowMultiple) {
            return this.getInternalSelection().map(v => v.data);
        } else {
            let result = this.getInternalSelection();
            if (result && result.length > 0) {
                return result[0].data;
            }
        }

        return null;
    }

    public getInternalSelection(): SelectableItem[] {
        return this.getSelectedItems(this._items);
    }

    public toggleItemSelection(item: SelectableItem): void {
        if (!this.Configuration.allowMultiple) {
            this._items.forEach(v => v.selected = false);
        }
        item.selected = !item.selected;
        this.setConfiguration(opt => opt.model = this.getSelection());
        if (this.Configuration.closeOnSelection) {
            this.setConfiguration(opt => opt.isOpen = false);
        }
    }

    public setConfiguration(delegate: OptionDelegate): void {
        let modelBck = this._options.model;
        delegate(this._options);
        this.configurationChanged$.next(this._options);
        if (this._options.isValid()) {
            this.reconfigure();
        }
        // if model changed, raise event
        if (modelBck !== undefined && this._options.model !== modelBck) {
            this.modelChanged$.next(this._options.model);
        }
    }

    public get Configuration(): SelectOption {
        return this._options;
    }

    private toSelectableItems(sources: any[]): SelectableItem[] {
        if (sources && Array.isArray(sources)) {
            return sources.map((srcItem) => {
                let item = new SelectableItem(
                        <string>srcItem[this._options.idProperty],
                        <string>srcItem[this._options.textProperty],
                        srcItem
                    );
                if (this._options.isHierarchy()) {
                    item.children = this.toSelectableItems(srcItem[this._options.childProperty]);
                }
                return item;
            });
        }

        return [];
    }

    private getSelectedItems(array: SelectableItem[]): SelectableItem[] {
        let res: SelectableItem[] = [];
        array.forEach(v => {
            if (v.hasChild) {
                res = [...res, ...this.getSelectedItems(v.children)];
            } else if (v.selected === true) {
                res.push(v);
            }
        });
        return res;
    }

    private reconfigure(): void {
        if (this.Configuration.isValid()) {
            this.checkConfig();
            this._items = this.toSelectableItems(this.Configuration.items);
            this.itemsChanged$.next(this._items);

            let model = this.getModel();
            let select: SelectableItem[] = [];
            model.forEach(v => {
                select = [...select, ...this.getItemForModel(v, this._items)];
            });
            select.forEach(v => v.selected = true);
        }
    }

    private checkConfig() {
        if (this.Configuration.allowMultiple && this.Configuration.closeOnSelection) {
            this.Configuration.closeOnSelection = false;
        } else if (!this.Configuration.allowMultiple && !this.Configuration.closeOnSelection) {
            this.Configuration.closeOnSelection = true;
        }
    }
    private getModel(): any[] {
        if (!this.Configuration.model) {
            return [];
        } else if (!Array.isArray(this.Configuration.model)) {
            return [this.Configuration.model];
        } else {
            return this.Configuration.model;
        }
    }

    private getItemForModel(value: any, array: SelectableItem[]): SelectableItem[] {
        let result: SelectableItem[] = [];
        array.forEach(v => {
            if (v.id === value[this.Configuration.idProperty]) {
                result.push(v);
            }
            if (this.Configuration.isHierarchy() && v.children && v.children.length > 0) {
                result = [...result, ...this.getItemForModel(value, v.children)];
            }
        });
        return result;
    }
}
