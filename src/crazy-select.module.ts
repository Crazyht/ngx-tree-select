import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TreeSelectComponent } from './Components/select.component';
import { TreeSelectItemComponent } from './Components/select-item.component';
import { OffClickDirective } from './Directives/off-click.directive';
import { ItemPipe } from './Pipes/item.pipe';

@NgModule({
  imports: [
      CommonModule, 
      FormsModule
    ],
  declarations: [
      TreeSelectComponent,
      TreeSelectItemComponent,
      OffClickDirective,
      ItemPipe
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
