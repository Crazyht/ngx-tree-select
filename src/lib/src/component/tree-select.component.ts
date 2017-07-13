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
  public showMoreLink = false;
  public moreLoaded = false;

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
  public set allowParentSelection(value: boolean) {
    this.svc.setConfiguration(opt => opt.allowParentSelection = value, true);
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

  public get allowParentSelection(): boolean {
    return this.svc.Configuration.allowParentSelection;
  }
  public get maxVisibleItemCount(): number {
    return this.svc.Configuration.maxVisibleItemCount;
  }

  public get internalItems(): SelectableItem[] {
    return this.svc.getInternalItems() || [];
  }

  public get selection(): SelectableItem[] {
    this.showMoreLink = (this.maxVisibleItemCount > 0 && ((this.svc.getInternalSelection().length - this.maxVisibleItemCount) > 0));
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

    this.svc.modelChanged$.subscribe(result => {
      this.onChangeCallback(result);
    });
    this.maxVisibleItemCount = (defaultOpts.maxVisibleItemCount || 0);
    this.allowFilter = (defaultOpts.allowFilter === undefined || defaultOpts.allowFilter === null ? true : defaultOpts.allowFilter)
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

  /**
   * Write a new value to the element.
   *
   * @param {*} value
   * @memberof TreeSelectComponent
   */
  writeValue(value: any): void {
    this.svc.setSelection(value);
  }

  /**
   * Set the function to be called when the control receives a change event.
   *
   * @param {*} fn
   * @memberof TreeSelectComponent
   */
  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  /**
   * Set the function to be called when the control receives a touch event.
   *
   * @param {*} fn
   * @memberof TreeSelectComponent
   */
  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  /**
   * This function is called when the control status changes to or from "DISABLED".
   * Depending on the value, it will enable or disable the appropriate DOM element.
   *
   * @param {boolean} isDisabled
   * @memberof TreeSelectComponent
   */
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /**
   * This finction is called when user click on show more link.
   *
   * @param {*} $event
   * @memberof TreeSelectComponent
   */
  loadMore($event: any) {
    $event.stopPropagation();
    this.moreLoaded = !this.moreLoaded;
  }

  ProcessMatchFilterTreeItem(tree: SelectableItem, filter: string): boolean {
    let result = false;
    if (tree && tree.children && tree.children.length > 0) {
      for (let child of tree.children) {
        result = this.ProcessMatchFilterTreeItem(child, filter) || result;
      }
    }
    tree.matchFilter = (tree.id.indexOf(filter) > -1 || tree.text.indexOf(filter) > -1 || result);

    return tree.matchFilter;
  }
}
