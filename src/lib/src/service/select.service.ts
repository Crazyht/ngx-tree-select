import { Subject } from 'rxjs/Rx';
import { SelectableItem } from '../model/selectable-item';
import { SelectOption } from '../model/SelectOption';
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
            this.setConfiguration(opt => opt.isOpen = false, false);
        }
    }

    public open(): void {
        if (!this.Configuration.isOpen) {
            this.setConfiguration(opt => opt.isOpen = true, false);
        }
    }

    public toggleOpen(): void {
        this.setConfiguration(opt => opt.isOpen = !opt.isOpen, false);
    }

    public setItems(value: any[]) {
        this.setConfiguration(opt => opt.items = value, true);
    }

    public getInternalItems(): SelectableItem[] {
        return this._items;
    }

    public setSelection(values: any | any[]): void {
        let tableValues: any[] = [];
        if (values && values.length > 0) {
            tableValues = values;
        }
        // tslint:disable-next-line:one-line
        else if (values) {
            tableValues.push(values);
        }
        let selectedItems: SelectableItem[];
        selectedItems = this.toSelectableItems(tableValues);
        if (selectedItems && selectedItems.length > 0) {
            for (let itm of this._items) {
                for (let val of selectedItems) {
                    if (itm.hasChild) {
                        for (let c in itm.children) {
                            if (itm.children[c].id === val.id) {
                                itm.children[c].selected = true;
                            }
                        }
                    }
                    // tslint:disable-next-line:one-line
                    else if (itm.id === val.id) {
                        itm.selected = true;
                    }
                }
            }
        }
        this.setConfiguration(opt => opt.model = this.getSelection(), false);
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
        let selectedItems = this.getSelectedItems(this._items);
        if(this._options.maxVisibleItemCount && this._options.maxVisibleItemCount > 0 && selectedItems && selectedItems.length >0){
             for(let i=0; i < this._options.maxVisibleItemCount ; i ++){
                selectedItems[i].isVisible = true;
            }
        }
        else
        {
            for(let item in selectedItems){
                selectedItems[item].isVisible = true;
            }
        }
        return selectedItems;
    }

    public toggleItemSelection(item: SelectableItem): void {
        if (!this.Configuration.allowMultiple) {
            this._items.forEach(v => v.selected = false);
        }
        item.selected = !item.selected;
        this.setConfiguration(opt => opt.model = this.getSelection(), false);
        if (this.Configuration.closeOnSelection) {
            this.setConfiguration(opt => opt.isOpen = false, false);
        }
    }

    public setConfiguration(delegate: OptionDelegate, processItems: boolean): void {
        let modelBck = this._options.model;
        delegate(this._options);
        this.configurationChanged$.next(this._options);
        if (this._options.isValid()) {
            this.reconfigure(processItems);
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
            let i =1;
            return sources.map((srcItem) => {
                let item ;

                if(srcItem[this._options.idProperty] && srcItem[this._options.idProperty] != ''  && srcItem[this._options.textProperty] ){
                    item = new SelectableItem(
                        (srcItem[this._options.idProperty] || '').toString(),
                        <string>srcItem[this._options.textProperty],
                        srcItem
                    );
                }else {
                        item = new SelectableItem(
                        i.toString(),
                        <string>srcItem,
                        srcItem
                    );
                    i++;
                }
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

    private reconfigure(processItems: boolean): void {
        if (this.Configuration.isValid()) {
            this.checkConfig();
            if (processItems) {
                this._items = this.toSelectableItems(this.Configuration.items);
                this.itemsChanged$.next(this._items);
            }

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
