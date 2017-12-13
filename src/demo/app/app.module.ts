import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ExpandMode, NgxTreeSelectModule } from 'ngx-tree-select';
import { Ng2BootstrapModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { FlatComponent } from './flat/flat.component';
import { HierarchicalComponent } from './hierarchical/hierarchical.component';
import { AppRoutes } from './app.routes';
import { SimpleValueComponent } from './simple-value/simple-value.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(AppRoutes),
    Ng2BootstrapModule.forRoot(),
    NgxTreeSelectModule.forRoot(
      {
        idField: 'id',
        textField: 'name',
        expandMode: ExpandMode.Selection
      })
  ],
  declarations: [
    AppComponent,
    FlatComponent,
    HierarchicalComponent,
    SimpleValueComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
