import { SelectService } from '../services/select.service';

export class SelectableItem {
  public _selected = false;
  public children?: SelectableItem[];
  public isOpen = false;
  public matchFilter = true;
  public isVisible = false;

  constructor(public id: string, public text: string, public data: any, public svc: SelectService) {
  }

  get hasChild(): boolean {
    return this.children && this.children.length > 0;
  }
  get checked(): boolean {
    if (this.hasChild && this.svc.Configuration.allowMultiple) {
      if (this.children.every((child) => child.selected)) {
        return true;
      } else if (this.children.every((child) => child.selected === false)) {
        return this._selected;
      }
      return null;
    }
    return this._selected;
  }
  get selected(): boolean {
    if (this.hasChild && this.svc.Configuration.allowMultiple) {
      if (this.children.some((child) => child.selected)) {
        if (this.svc.Configuration.allowParentSelection) {
          this._selected = false;
        }
        return true;
      } else if (this.children.every((child) => child.selected === false)) {
        if (this.svc.Configuration.allowParentSelection) {
          return this._selected;
        } else {
          return this._selected = false;
        }
      }
      return false;
    } else if (this.hasChild && this._selected === true) {
      for (const itm of this.children) {
        itm.selected = false;
      }
    }

    return this._selected;
  }
  set selected(value: boolean) {
    if (this.hasChild && !this.svc.Configuration.allowParentSelection) {
      if (value !== null) {
        this.children.forEach((child) => child.selected = value);
      }
    } else {
      this._selected = value;
    }
  }
}
