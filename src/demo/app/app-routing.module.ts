import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlatSampleComponent } from './flat-sample/flat-sample.component';
import { HierarchicalSampleComponent } from './hierarchical-sample/hierarchical-sample.component';
import { SimpleItemsComponent } from './simple-items/simple-items.component';

const routes: Routes = [
  { path: '',   redirectTo: '/flat', pathMatch: 'full' },
  { path: 'flat', component: FlatSampleComponent },
  { path: 'hierarchical', component: HierarchicalSampleComponent },
  { path: 'simplevalue', component: SimpleItemsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
