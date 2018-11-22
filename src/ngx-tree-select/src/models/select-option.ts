import { ExpandMode } from './expand-mode';

export class SelectOption {
  public idProperty = 'id';
  public textProperty = 'text';
  public childProperty: string = null;
  public allowMultiple = false;
  public closeOnSelection = true;
  public items: any[] = [];
  public model: any[] | any;
  public isOpen = false;
  public filter = '';
  public filterCaseSensitive = false;
  public allowParentSelection = false;
  public restructureWhenChildSameName = false;
  public maxVisibleItemCount: number;
  public expandMode = ExpandMode.None;

  public isHierarchy(): boolean {
    return this.childProperty && this.childProperty.trim().length > 0;
  }

  public get filterExpandMode(): ExpandMode {
     if (this.filter !== '') {
        return ExpandMode.All;
     } else {
       return this.expandMode;
     }
  }

  public displayCheckbox(): boolean {
    return this.allowMultiple && this.isHierarchy();
  }

  public isValid(): boolean {
    // Check id property value
    return this.idProperty && this.idProperty.trim().length > 0 &&
      // Check text property value
      this.textProperty && this.textProperty.trim().length > 0 &&
      // Check items value
      this.items && Array.isArray(this.items) && this.items.length > 0;
  }
}
