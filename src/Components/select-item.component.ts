import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SelectableItem } from '../selectable-item';
import { SelectService } from '../Services/select.service';

@Component({
    selector: 'cra-select-item',
    template: `
<div class="ui-select-choices-row"
     [class.active]="item.selected"
     (click)="select($event)">
    <a href="javascript:void(0)" class="dropdown-item">
        <div>{{item.text}}</div>
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

    public get haveChildren(): boolean {
        return this.item && this.item.children && this.item.children.length > 0;
    }

    public select($event: any): void {
        this.svc.toggleItemSelection(this.item);
    }
}
