import {
  Component,
  forwardRef,
  HostListener,
  Input,
  OnInit
  } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ItemPipe } from '../pipes/item.pipe';
import { SelectableItem } from '../models/selectable-item';
import { SelectOption } from '../models/select-option';
import { SelectService } from '../services/select.service';
import { TreeSelectDefaultOptions } from '../models/tree-select-default-options';
import { ExpandMode } from '../models/expand-mode';

// tslint:disable-next-line:no-empty
const noop = () => {};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line:no-forward-ref
  useExisting: forwardRef(() => TreeSelectComponent),
  multi: true
};

@Component({
  selector: 'tree-select',
  templateUrl: './tree-select.component.html',
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, SelectService],
  styleUrls: ['./tree-select.component.scss']
})
export class TreeSelectComponent implements ControlValueAccessor {
  public onTouchedCallback: () => void = noop;
  public showMoreLink = false;
  public moreLoaded = false;
  @Input() public disabled = false;
  @Input() public placeholder = '';
  @Input() public filterPlaceholder = 'Type here for filtering items...';
  @Input() public allowFilter = true;
  private _isOpen = false;
  private onChangeCallback: (_: any) => void = noop;
  private haveFocus = false;
  private inputFocus = false;

  @Input()
  public set items(value: any[]) {
    this.svc.setItems(value);
  }

  @Input()
  public set idField(value: string) {
    this.svc.setConfiguration((opt) => opt.idProperty = value, true);
  }

  @Input()
  public set textField(value: string) {
    this.svc.setConfiguration((opt) => opt.textProperty = value, true);
  }

  @Input()
  public set allowParentSelection(value: boolean) {
    this.svc.setConfiguration((opt) => opt.allowParentSelection = value, true);
  }

  public get allowParentSelection(): boolean {
    return this.svc.Configuration.allowParentSelection;
  }

  @Input()
  public set restructureWhenChildSameName(value: boolean) {
    this.svc.setConfiguration((opt) => opt.restructureWhenChildSameName = value, true);
  }

  public get restructureWhenChildSameName(): boolean {
    return this.svc.Configuration.restructureWhenChildSameName;
  }

  @Input()
  public set childrenField(value: string) {
    this.svc.setConfiguration((opt) => opt.childProperty = value, true);
  }

  @Input()
  public set multiple(value: boolean) {
    this.svc.setConfiguration((opt) => opt.allowMultiple = value, true);
  }
  public get multiple(): boolean {
    return this.svc.Configuration.allowMultiple;
  }

  @Input()
  public set filterCaseSensitive(value: boolean) {
    this.svc.setConfiguration((opt) => opt.filterCaseSensitive = value, true);
  }
  public get filterCaseSensitive(): boolean {
    return this.svc.Configuration.filterCaseSensitive;
  }

  @Input()
  public set expandMode(value: string) {
    this.svc.setConfiguration((opt) => opt.expandMode = value, true);
    this.svc.setExpand();
  }
  public get expandMode(): string {
    return this.svc.Configuration.expandMode;
  }

  @Input()
  public set maxVisibleItemCount(value: number) {
    this.svc.setConfiguration((opt) => opt.maxVisibleItemCount = value, true);
  }
  public get maxVisibleItemCount(): number {
    return this.svc.Configuration.maxVisibleItemCount;
  }

  public get internalItems(): SelectableItem[] {
    return this.svc.getInternalItems() || [];
  }

  public get selection(): SelectableItem[] {
    this.showMoreLink = (
      this.maxVisibleItemCount > 0 &&
      ((this.svc.getInternalSelection().length - this.maxVisibleItemCount) > 0)
    );
    return this.svc.getInternalSelection();
  }

  public get filter(): string {
    return this.svc.Configuration.filter;
  }

  public set filter(value: string) {
    this.svc.setConfiguration((opt) => opt.filter = value, false);
    for (const item of this.internalItems) {
      this.ProcessMatchFilterTreeItem(item, this.svc.Configuration.filter);
    }
    this.svc.setExpand();
  }

  public constructor(
    private svc: SelectService,
    private defaultOpts: TreeSelectDefaultOptions
  ) {
    this.clickedOutside = this.clickedOutside.bind(this);

    this.svc.modelChanged$.subscribe((result) => {
      this.onChangeCallback(result);
    });
    this.maxVisibleItemCount = (defaultOpts.maxVisibleItemCount || 0);
    this.allowParentSelection = (
      (defaultOpts.allowParentSelection === undefined ||
       defaultOpts.allowParentSelection === null) ?
        true :
        defaultOpts.allowParentSelection
    );
    this.allowFilter = (
      (defaultOpts.allowFilter === undefined || defaultOpts.allowFilter === null) ?
        true :
        defaultOpts.allowFilter
    );
    this.filterCaseSensitive = (
      (defaultOpts.filterCaseSensitive === undefined || defaultOpts.filterCaseSensitive === null) ?
        false :
        defaultOpts.filterCaseSensitive
    );
    this.filterPlaceholder = (defaultOpts.filterPlaceholder || 'Type here for filtering items...');
    this.idField = (defaultOpts.idField || 'id');
    this.textField = (defaultOpts.textField || 'id');
    this.childrenField = (defaultOpts.childrenField || '');
    this.expandMode = (defaultOpts.expandMode || ExpandMode.None);
  }

  // tslint:disable-next-line:no-empty
  public keyUp($event: any) {}

  public toggle($event: any) {
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

  public clickedOutside() {
    if (!this.inputFocus) {
      if (!this.haveFocus && this.isOpen || this.haveFocus && !this.isOpen) {
        this.onTouched();
      }
      this.haveFocus = false;
    }
  }

  // Set touched on blur
  public onTouched() {
    this.svc.close();
    this.onTouchedCallback();
  }

  public setInputFocus() {
    this.inputFocus = true;
  }
  public setInputFocusOut() {
    this.inputFocus = false;
  }

  /**
   * Write a new value to the element.
   *
   * @param {*} value
   * @memberof TreeSelectComponent
   */
  public writeValue(value: any): void {
    this.svc.setSelection(value);
  }

  /**
   * Set the function to be called when the control receives a change event.
   *
   * @param {*} fn
   * @memberof TreeSelectComponent
   */
  public registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  /**
   * Set the function to be called when the control receives a touch event.
   *
   * @param {*} fn
   * @memberof TreeSelectComponent
   */
  public registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  /**
   * This function is called when the control status changes to or from "DISABLED".
   * Depending on the value, it will enable or disable the appropriate DOM element.
   *
   * @param {boolean} isDisabled
   * @memberof TreeSelectComponent
   */
  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /**
   * This finction is called when user click on show more link.
   *
   * @param {*} $event
   * @memberof TreeSelectComponent
   */
  public loadMore($event: any) {
    $event.stopPropagation();
    this.moreLoaded = !this.moreLoaded;
  }

  private ProcessMatchFilterTreeItem(tree: SelectableItem, filter: string): boolean {
    let result = false;
    if (tree && tree.children && tree.children.length > 0) {
      for (const child of tree.children) {
        result = this.ProcessMatchFilterTreeItem(child, filter) || result;
      }
    }
    tree.matchFilter = this.filterCaseSensitive ?
                      (
                        tree.id.indexOf(filter) > -1 ||
                        tree.text.indexOf(filter) > -1 ||
                        result) :
                      (
                        tree.id.toLowerCase().indexOf(filter.toLowerCase()) > -1 ||
                        tree.text.toLowerCase().indexOf(filter.toLowerCase()) > -1 ||
                        result
                      );
    return tree.matchFilter;
  }
}
