import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxTreeSelectModule } from 'ngx-tree-select';

import { AppComponent }  from './app.component';

@NgModule({
<<<<<<< HEAD
  imports:      [ BrowserModule, FormsModule, NgxTreeSelectModule.forRoot({ FilterPlaceholder : 'Filter...',
    MaxItems : 2})],
=======
  imports:      [ BrowserModule, FormsModule, NgxTreeSelectModule.forRoot({ filterPlaceholder: 'test' })],
>>>>>>> dev
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
