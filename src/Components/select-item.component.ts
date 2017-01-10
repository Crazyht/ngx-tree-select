import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SelectableItem } from '../selectable-item';
import { SelectService } from '../Services/select.service';

@Component({
    selector: 'cra-select-item',
    template: `
<div class="ui-select-choices-row"
     [ngClass]="{'ui-select-choices-row-children': needCheckBox}"    
     [class.active]="item.selected"
     (click)="select($event)">
    <a href="javascript:void(0)" class="dropdown-item">
        <div><input type="checkbox" *ngIf="needCheckBox" [checked]="item.selected" /> {{item.text}}</div>
    </a>
    <ul *ngIf="haveChildren"
        class="ui-select-choices"
        role="menu">
        <li *ngFor="let o of item.children" role="menuitem">
            <cra-select-item [item]="o" (selected)="itemSelected()"></cra-select-item>
        </li>
    </ul>
</div>
    `
})
export class TreeSelectItemComponent {
    @Input()
    public item: SelectableItem;

    public constructor(
        private svc: SelectService
    ) {}

    get needCheckBox(): boolean {
        return this.svc.Configuration.isHierarchy() && this.svc.Configuration.allowMultiple;
    }

    public get haveChildren(): boolean {
        return this.item && this.item.children && this.item.children.length > 0;
    }

    public select($event: any): void {
        if (this.svc.Configuration.allowMultiple || !this.haveChildren) {
            this.svc.toggleItemSelection(this.item);
        }
    }
}
