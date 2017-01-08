import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreeSelectComponent } from './Components/select.component';
import { TreeSelectItemComponent } from './Components/select-item.component';
import { OffClickDirective } from './Directives/off-click.directive';

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
