import { Subject } from 'rxjs';
import { SelectableItem } from '../models/selectable-item';
import { SelectOption } from '../models/select-option';
import { Injectable } from '@angular/core';
import { ExpandMode } from '../models/expand-mode';

export type OptionDelegate = (options: SelectOption) => void;

@Injectable()
export class SelectService {
  public modelChanged$: Subject<any> = new Subject<any>();

  private _items: SelectableItem[];
  private _options: SelectOption = new SelectOption();

  public close(): void {
    if (this.Configuration.isOpen) {
      this.setConfiguration((opt) => opt.isOpen = false, false);
    }
  }

  public open(): void {
    if (!this.Configuration.isOpen) {
      this.setConfiguration((opt) => opt.isOpen = true, false);
    }
  }

  public toggleOpen(): void {
    this.setConfiguration((opt) => opt.isOpen = !opt.isOpen, false);
  }

  /*
    Call when list of items is set.
  */
  public setItems(value: any[]) {
    this.setConfiguration((opt) => opt.items = value, true);
    this.setExpand();
  }

  public getInternalItems(): SelectableItem[] {
    return this._items;
  }

  /*
    Call when ng-model is set
  */
  public setSelection(values: any | any[]): void {
    this.setConfiguration((opt) => opt.model = values, true);
    this.setExpand();
  }

  public setSelectedItemOrChild(items: SelectableItem[], destination: string) {
    for (const itm of items) {
      if (itm.hasChild) {
        if (itm.id === destination) {
          itm.selected = true;
        }
        this.setSelectedItemOrChild(itm.children, destination);
      } else if (itm.id === destination) {
        itm.selected = true;
      }
    }
  }

  public getSelection(): any | any[] {
    if (this.Configuration.allowMultiple) {
      return this.getInternalSelection().map((v) => v.data);
    } else {
      const result = this.getInternalSelection();
      if (result && result.length > 0) {
        return result[0].data;
      }
    }

    return null;
  }

  public getInternalSelection(): SelectableItem[] {
    const selectedItems = this.getSelectedItems(this._items);
    if (selectedItems && selectedItems.length > 0) {
      let i = 0;
      const max = this._options.maxVisibleItemCount ? this._options.maxVisibleItemCount : 0;

      for (const item of selectedItems) {
        item.isVisible =
          // Max not reached or not max value
          (i < max || max === 0) &&
          // all my children are unselected
          (!item.hasChild || item.children.every((child) => child.selected === false));
        if (item.isVisible && max > 0) {
          i++;
        }
      }
    }
    return selectedItems;
  }

  public toggleItemSelection(item: SelectableItem): void {
    if (!this.Configuration.allowMultiple) {
      this.setAllUnselected(this._items);
    }
    item.selected = !item.selected;
    this.setConfiguration((opt) => opt.model = this.getSelection(), false);
    if (this.Configuration.closeOnSelection) {
      this.setConfiguration((opt) => opt.isOpen = false, false);
    }
  }

  public setAllUnselected(items: SelectableItem[]) {
    for (const itm of items) {
      if (itm.hasChild) {
        itm.selected = false;
        this.setAllUnselected(itm.children);
      } else {
        itm.selected = false;
      }
    }
  }

  public setConfiguration(delegate: OptionDelegate, processItems: boolean): void {
    const modelBck = this._options.model;
    delegate(this._options);
    if (this._options.isValid()) {
      this.reconfigure(processItems);
    }
    // if model changed, raise event
    if (
      !processItems &&
      (
        (modelBck && this._options.model !== modelBck) ||
        (!modelBck && this._options.model)
      )
    ) {
      this.modelChanged$.next(this._options.model);
    }
  }

  public get Configuration(): SelectOption {
    return this._options;
  }

  public setExpand() {
    this.setExpandForList(this._items);
  }

  private setExpandForList(items: SelectableItem[]) {
    if (!items) {
      return;
    }
    for (const item of items) {
      this.setExpandForList(item.children);
      item.isOpen = (this._options.filterExpandMode === ExpandMode.All);
      if (this._options.filterExpandMode === ExpandMode.Selection) {
        if (item.children) {
          item.isOpen = item.children.some(
            (itm: SelectableItem) => itm.isOpen || itm.selected
          );
        }
      }
    }
  }

  private toSelectableItems(sources: any[]): SelectableItem[] {
    if (sources && Array.isArray(sources)) {
      let i = 1;
      return sources.map((srcItem) => {
        let item: SelectableItem;
        if (srcItem[this._options.idProperty] &&
            srcItem[this._options.idProperty] !== '' &&
            srcItem[this._options.textProperty]) {
          item = new SelectableItem(
            (srcItem[this._options.idProperty] || '').toString(),
            srcItem[this._options.textProperty] as string,
            srcItem,
            this
          );
        } else {
          item = new SelectableItem(
            i.toString(),
            srcItem as string,
            srcItem,
            this
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
    if (this.Configuration.isValid()) {
      let res: SelectableItem[] = [];
      for (const v of array) {
        if (v.hasChild && v.selected === true) {
          if (v.children.every((child) => child.selected === false)) {
            res = [...res, v];
          } else {
            res = [...res, ...this.getSelectedItems(v.children)];
          }
        } else if (v.hasChild) {
          res = [...res, ...this.getSelectedItems(v.children)];
        } else if (v.selected === true) {
          res = [...res, v];
        }
      }
      return res;
    } else {
      return [];
    }
  }

  private reconfigure(processItems: boolean): void {
    if (this.Configuration.isValid()) {
      this.checkConfig();
      if (processItems) {
        this._items = this.toSelectableItems(this.Configuration.items);
      }

      const model = this.getModel();
      let select: SelectableItem[] = [];
      model.forEach((v) => {
        select = [...select, ...this.getItemForModel(v, this._items)];
      });
      select.forEach((v) => v._selected = true);
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
    for (const v of array) {
      if (value) {
        if (typeof value !== 'object') {
          if (v.data === value) {
            result.push(v);
          }
        } else {
          if (value[this.Configuration.idProperty]) {
            if (v.id === (value[this.Configuration.idProperty] || '').toString()) {
              result.push(v);
            }
          }
          if (this.Configuration.isHierarchy() && v.children && v.children.length > 0) {
            result = [...result, ...this.getItemForModel(value, v.children)];
          }
        }
      }
    }
    return result;
  }
}
