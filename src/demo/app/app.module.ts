import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgxTreeSelectModule } from 'ngx-tree-select';
import { Ng2BootstrapModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { FlatComponent } from "app/components/flat.component";
import { HierarchicalComponent } from './components/hierarchical.component';
import { AppRoutes } from './app.routes';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(AppRoutes),
    Ng2BootstrapModule.forRoot(),
    NgxTreeSelectModule.forRoot({ filterPlaceholder: 'test', maxVisibleItemCount: 3 })
  ],
  declarations: [
    AppComponent,
    FlatComponent,
    HierarchicalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
