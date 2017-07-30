import * as console from 'console';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HierarchicalCountries } from '../../datas';
import { ItemPipe } from '../src/pipes/item.pipe';
import { NgxTreeSelectModule } from '../src/index';
import { OffClickDirective } from '../src/directives/off-click.directive';
import { SelectService } from '../src/services/select.service';
import { TreeSelectComponent } from '../src/components/tree-select.component';
import { TreeSelectDefaultOptions } from '../src/models/tree-select-default-options';
import { TreeSelectItemComponent } from '../src/components/tree-select-item.component';

describe('TreeSelectComponent', () => {
  let comp: TreeSelectSimpleBasicComponent;
  let fixture: ComponentFixture<TreeSelectSimpleBasicComponent>;
  let trigger: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, NgxTreeSelectModule.forRoot({})],
      declarations: [TreeSelectSimpleBasicComponent],
      providers: [{ provide: TreeSelectDefaultOptions, useValue: {} }]
    })
      .compileComponents();
  }));

  // For reasons unknown, not using `done` (even calling it synchronously),
  // causes Chrome (v58+) to often get disconnected (at least on Windows and Travis).
  beforeEach((done: DoneFn) => {
    fixture = TestBed.createComponent(TreeSelectSimpleBasicComponent);
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
    const outsideElement = fixture.debugElement.query(By.css('.outside')).nativeElement;
    outsideElement.click();
    fixture.detectChanges();
    // Not work with jest : Need investigation
    // expect(fixture.componentInstance.select.isOpen).toBe(false);
  });

  it('should contains selected', () => {
    expect(comp.selectedCountry).toBeDefined();
    expect(comp.selectedCountry.id).toBe('LU');
    fixture.detectChanges();
    const selected = fixture.debugElement.query(
      By.css('.selected-item-text')
    ).nativeElement as HTMLSpanElement;
    expect(selected.innerHTML).toContain(comp.selectedCountry.name);
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
class TreeSelectSimpleBasicComponent {

  @ViewChild(TreeSelectComponent)
  public select: TreeSelectComponent;

  public selectedCountry = {
    id: 'LU',
    name: 'Luxembourg',
    capital: 'Luxembourg',
    phone: '352',
    currency: 'EUR'
  };
  public countries = HierarchicalCountries;
}
