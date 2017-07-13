import { TreeSelectDefaultOptions } from './../model/tree-select-default-options';
import { Component, forwardRef, Input, OnInit, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { SelectableItem } from '../model/selectable-item';
import { SelectService } from '../service/select.service';
import { SelectOption } from '../model/SelectOption';
import { ItemPipe } from '../pipe/item.pipe';

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TreeSelectComponent),
  multi: true
};

@Component({
  selector: 'tree-select',
  templateUrl: './tree-select.component.html',
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, SelectService],
  styleUrls: ['./tree-select.component.css']
})
export class TreeSelectComponent implements ControlValueAccessor {
  private _isOpen = false;
  public onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;
  private haveFocus = false;
  private inputFocus = false;

  @Input() public disabled = false;
  @Input() public filterPlaceholder = 'Type here for filtering items...';
  @Input() public allowFilter = true;

  @Input()
  public set items(value: any[]) {
    this.svc.setItems(value);
  }

  @Input()
  public set idField(value: string) {
    this.svc.setConfiguration(opt => opt.idProperty = value, true);
  }

  @Input()
  public set textField(value: string) {
    this.svc.setConfiguration(opt => opt.textProperty = value, true);
  }

  @Input()
  public set onlySelectParent(value: boolean) {
    this.svc.setConfiguration(opt => opt.onlySelectParent = value, true);
  }

  @Input()
  public set childrenField(value: string) {
    this.svc.setConfiguration(opt => opt.childProperty = value, true);
  }

  @Input()
  public set multiple(value: boolean) {
    this.svc.setConfiguration(opt => opt.allowMultiple = value, true);
  }
  @Input()
  public set maxVisibleItemCount(value: number) {
    this.svc.setConfiguration(opt => opt.maxVisibleItemCount = value, true);
  }

  public get multiple(): boolean {
    return this.svc.Configuration.allowMultiple;
  }

  public get onlySelectParent(): boolean {
    return this.svc.Configuration.onlySelectParent;
  }
  public get maxVisibleItemCount(): number {
    return this.svc.Configuration.maxVisibleItemCount;
  }

  public get loadAllItems(): boolean {
    return this.svc.Configuration.loadAllItems;
  }

  public get internalItems(): SelectableItem[] {
    return this.svc.getInternalItems() || [];
  }

  public get selection(): SelectableItem[] {
    if (this.maxVisibleItemCount && ((this.svc.getInternalSelection().length - this.maxVisibleItemCount) > 0)) {
      this.svc.setConfiguration(opt => opt.loadAllItems = true, false);
    }
    return this.svc.getInternalSelection();
  }

  public get filter(): string {
    return this.svc.Configuration.filter;
  }

  public set filter(value: string) {
    this.svc.setConfiguration(opt => opt.filter = value, false);
    for (let item of this.internalItems) {
      this.ProcessMatchFilterTreeItem(item, this.svc.Configuration.filter);
    }
  }

  public constructor(
    private svc: SelectService,
    private defaultOpts: TreeSelectDefaultOptions
  ) {
    this.clickedOutside = this.clickedOutside.bind(this);

    this.svc.configurationChanged$.subscribe(options => {
    });
    this.svc.itemsChanged$.subscribe(items => {
      // this.onChangeCallback(this.svc.getSelection());
    });
    this.svc.itemSelectionChanged$.subscribe(items => {
    });
    this.svc.modelChanged$.subscribe(result => {
      this.onChangeCallback(result);
    });
    this.maxVisibleItemCount = (defaultOpts.maxVisibleItemCount || 0);
    this.filterPlaceholder = (defaultOpts.filterPlaceholder || 'Type here for filtering items...');
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
    if (!this.inputFocus) {
      if (!this.haveFocus && this.isOpen || this.haveFocus && !this.isOpen) {
        this.onTouched();
      }
      this.haveFocus = false;
    }
  }

  // Set touched on blur
  @HostListener('blur')
  onTouched() {
    this.svc.close();
    this.onTouchedCallback();
  }

  setInputFocus() {
    this.inputFocus = true;
  }
  setInputFocusOut() {
    this.inputFocus = false;
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

  loadMore($event: any) {
    $event.stopPropagation();
    this.svc.setConfiguration(opt => opt.loadAllItems = false, false);
    this.svc.setConfiguration(opt => opt.maxVisibleItemCount = 0, false);
  }

  ProcessMatchFilterTreeItem(tree: SelectableItem, filter: string): boolean {
    let result = false;
    if (tree && tree.children && tree.children.length > 0) {
      for (let child of tree.children) {
        result = this.ProcessMatchFilterTreeItem(child, filter) || result;
      }
    }
    tree.matchFilter = (tree.id.indexOf(filter) > -1 || tree.text.indexOf(filter) > -1 || result);
    // console.info(`${tree.id} -> ${tree.text} => ${filter} ==> ${tree.matchFilter}`)

    return tree.matchFilter;
  }
}
