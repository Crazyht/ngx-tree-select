import { Component, Input } from '@angular/core';
import { SelectableItem } from './selectable-item';

@Component({
    selector: 'cra-select-item',
    template: `
<div class="ui-select-choices-row"
     [class.active]="item.selected"
     (click)="select($event)">
    <a href="javascript:void(0)" class="dropdown-item">
        <div>{{item.text}}</div>
    </a>
</div>
    `
})
export class TreeSelectItemComponent {
    @Input()
    public item: SelectableItem;

    public get haveChildren(): boolean {
        return this.item && this.item.children && this.item.children.length > 0;
    }
}
