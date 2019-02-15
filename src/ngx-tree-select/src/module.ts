import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemPipe } from './pipes/item.pipe';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { OffClickDirective } from './directives/off-click.directive';
import { OffFocusDirective } from './directives/off-focus.directive';
import { TreeSelectComponent } from './components/tree-select.component';
import { TreeSelectDefaultOptions } from './models/tree-select-default-options';
import { TreeSelectItemComponent } from './components/tree-select-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    TreeSelectComponent,
    TreeSelectItemComponent,
    OffClickDirective,
    OffFocusDirective,
    ItemPipe
  ],
  exports: [
    TreeSelectComponent
  ]
})

export class NgxTreeSelectModule {
  public static forRoot(options: TreeSelectDefaultOptions): ModuleWithProviders<NgxTreeSelectModule> {
    return {
      ngModule: NgxTreeSelectModule,
      providers: [
        { provide: TreeSelectDefaultOptions, useValue: options }
      ]
    };
  }

}
