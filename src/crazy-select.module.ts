import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreeSelectComponent } from './select.component';
import { TreeSelectItemComponent } from './select-item.component';
import { OffClickDirective } from './off-click.directive';

@NgModule({
  imports: [
      CommonModule
    ],
  declarations: [
      TreeSelectComponent,
      TreeSelectItemComponent,
      OffClickDirective
    ],
  exports: [
      TreeSelectComponent
    ]
})
export class CrazySelectModule {

  /* optional: in case you need users to override your providers */
  static forRoot(configuredProviders: Array<any>): ModuleWithProviders {
    return {
      ngModule: CrazySelectModule,
      providers: configuredProviders
    };
  }
}
