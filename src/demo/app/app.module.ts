import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxTreeSelectModule } from 'ngx-tree-select';

import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, NgxTreeSelectModule.forRoot({ FilterPlaceholder : 'Filter...',
    MaxItems : 2})],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
