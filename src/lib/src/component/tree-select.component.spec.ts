import { NgxTreeSelectModule } from '../../index';
import { TreeSelectDefaultOptions } from './../model/tree-select-default-options';
import { IsVisiblePipe } from './../pipe/isVisible.pipe';
import { ItemPipe } from './../pipe/item.pipe';
import { TreeSelectItemComponent } from './tree-select-item.component';
import { OffClickDirective } from './../directive/off-click.directive';
import { SelectService } from './../service/select.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { TreeSelectComponent } from './tree-select.component';
import { HierarchicalCountries } from '../../../datas/hierarchical-data';

describe('TreeSelectComponent', function() {
    let de: DebugElement;
    let comp: TreeSelectSimpleBasic;
    let fixture: ComponentFixture<TreeSelectSimpleBasic>;
    let trigger: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, NgxTreeSelectModule.forRoot({})],
            declarations: [TreeSelectSimpleBasic],
            providers: [{ provide: TreeSelectDefaultOptions, useValue: {} }]
        })
            .compileComponents();
    }));

    // For reasons unknown, not using `done` (even calling it synchronously),
    // causes Chrome (v58+) to often get disconnected (at least on Windows and Travis).
    beforeEach((done: DoneFn) => {
        fixture = TestBed.createComponent(TreeSelectSimpleBasic);
        comp = fixture.componentInstance;
        fixture.detectChanges();
        trigger = fixture.debugElement.query(By.css('tree-select .form-control')).nativeElement;
        done();
    });

    it('should create test component', () => expect(comp).toBeDefined());
    it('should create tree-select component', () => expect(comp.select).toBeDefined());

    it('should toggle dropdown on select container click', () => {
        trigger.click();
        fixture.detectChanges();
        expect(fixture.componentInstance.select.isOpen).toBe(true);

        trigger.click();
        fixture.detectChanges();
        expect(fixture.componentInstance.select.isOpen).toBe(false);
    });
    it('should close dropdown on outside click', () => {
        trigger.click();
        fixture.detectChanges();
        expect(fixture.componentInstance.select.isOpen).toBe(true);
        fixture.debugElement.query(By.css('.outside')).nativeElement.click();
        fixture.detectChanges();
        expect(fixture.componentInstance.select.isOpen).toBe(false);
    });

    it('should contain selected', () => {
        expect(comp.selectedCountry).toBeDefined();
        expect(comp.selectedCountry.id).toBe('LU');
        fixture.detectChanges();
        const selected = fixture.debugElement.query(By.css('.selected-item-text')).nativeElement as HTMLSpanElement;
        expect(selected.innerText.trim()).toBe(comp.selectedCountry.name);
    });
});


@Component({
    template: `
      <form novalidate>
        <div>
            <tree-select name="test"
                         [items]="countries"
                         idField="id"
                         textField="name"
                         childrenField="children"
                         [(ngModel)]="selectedCountry">
            </tree-select>
            <span class="outside"></span>
        </div>
      </form>
    `
})
class TreeSelectSimpleBasic {
    @ViewChild(TreeSelectComponent) select: TreeSelectComponent;
    selectedCountry = {
        id: 'LU',
        name: 'Luxembourg',
        capital: 'Luxembourg',
        phone: '352',
        currency: 'EUR'
    };
    countries = HierarchicalCountries;
}
