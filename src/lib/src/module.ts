import { TreeSelectDefaultOptions } from './model/tree-select-default-options';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TreeSelectComponent } from './component/tree-select.component';
import { TreeSelectItemComponent } from './component/tree-select-item.component';
import { OffClickDirective } from './directive/off-click.directive';
import { ItemPipe } from './pipe/item.pipe';
import { IsVisiblePipe } from './pipe/isVisible.pipe';
import { NgxTreeSelectDefaultOption } from './model/ngxTreeSelectDefaultOption';

@NgModule({
  imports: [
<<<<<<< HEAD
      CommonModule,
      FormsModule
 ],
  declarations: [
      TreeSelectComponent,
      TreeSelectItemComponent,
      OffClickDirective,
      ItemPipe,
      IsVisiblePipe
     ],
  exports: [
      TreeSelectComponent
    ],
  providers : [ 
      NgxTreeSelectDefaultOption
     ]
})
export class NgxTreeSelectModule {

    static forRoot(options:NgxTreeSelectDefaultOption): ModuleWithProviders {
      let opt= new NgxTreeSelectDefaultOption();
      if(options){
        opt.FilterPlaceholder = (options.FilterPlaceholder ? options.FilterPlaceholder : opt.FilterPlaceholder);
        opt.MaxItems = (options.MaxItems ? options.MaxItems : opt.MaxItems);
      }
      return {
        ngModule: NgxTreeSelectModule,
        providers: [
          {provide: NgxTreeSelectDefaultOption, useValue: opt } 
        ]
      };
  }

=======
    CommonModule,
    FormsModule
  ],
  declarations: [
    TreeSelectComponent,
    TreeSelectItemComponent,
    OffClickDirective,
    ItemPipe,
    IsVisiblePipe
  ],
  exports: [
    TreeSelectComponent
  ]
})
export class NgxTreeSelectModule {
  static forRoot(options: TreeSelectDefaultOptions): ModuleWithProviders {
    return {
      ngModule: NgxTreeSelectModule,
      providers: [
        { provide: TreeSelectDefaultOptions, useValue: options }
      ]
    };
  }
>>>>>>> dev
}
