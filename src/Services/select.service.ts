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

    public get items(): SelectableItem[] {
        return this._items;
    }


    public get selectedItems(): SelectableItem[] {
        return this.getSelectedItems(this.Configuration.items);
    }

    public setItems(value: any[]) {
        this.setConfiguration(opt => opt.items = value);
        this._items = this.toSelectableItems(this.Configuration.items);
        this.itemsChanged$.next(this._items);
    }

    public setConfiguration(delegate: OptionDelegate): void {
        let modelBck = this._options.model;
        delegate(this._options);
        this.configurationChanged$.next(this._options);
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
            if (v.children && v.children.length > 0) {
                res = [...res, ...this.getSelectedItems(v.children)];
            } else if (v.selected === true) {
                res.push(v);
            }
        });
        return res;
    }

    private changeSelection() {

    }
}