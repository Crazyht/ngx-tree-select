import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Ng2BootstrapModule } from 'ngx-bootstrap';
import { NgxTreeSelectModule } from '../../lib';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlatSampleComponent } from './flat-sample/flat-sample.component';
import { HierarchicalSampleComponent } from './hierarchical-sample/hierarchical-sample.component';
import { SimpleItemsComponent } from './simple-items/simple-items.component';

@NgModule({
  declarations: [
    AppComponent,
    FlatSampleComponent,
    HierarchicalSampleComponent,
    SimpleItemsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    Ng2BootstrapModule.forRoot(),
    NgxTreeSelectModule.forRoot({ idField: 'id', textField: 'name' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
