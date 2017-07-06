import { TreeSelectDefaultOptions } from './../model/tree-select-default-options';
import { IsVisiblePipe } from './../pipe/isVisible.pipe';
import { FormsModule } from '@angular/forms';
import { ItemPipe } from './../pipe/item.pipe';
import { TreeSelectItemComponent } from './tree-select-item.component';
import { OffClickDirective } from './../directive/off-click.directive';
import { SelectService } from './../service/select.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TreeSelectComponent } from './tree-select.component';

describe('TreeSelectComponent', function () {
  let de: DebugElement;
  let comp: TreeSelectComponent;
  let fixture: ComponentFixture<TreeSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [TreeSelectComponent, OffClickDirective, TreeSelectItemComponent, ItemPipe, IsVisiblePipe],
      providers: [{ provide: TreeSelectDefaultOptions, useValue: {} }]
    })
    .compileComponents();
  }));

  // For reasons unknown, not using `done` (even calling it synchronously),
  // causes Chrome (v58+) to often get disconnected (at least on Windows and Travis).
  beforeEach( (done: DoneFn) => {
    fixture = TestBed.createComponent(TreeSelectComponent);
    comp = fixture.componentInstance;
    done();
  });

  it('should create component', () => expect(comp).toBeDefined());
});
