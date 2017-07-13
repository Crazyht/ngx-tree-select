import { FlatComponent } from './components/flat.component';
import { HierarchicalComponent } from './components/hierarchical.component';

export const AppRoutes = [
  { path: '',   redirectTo: '/flat', pathMatch: 'full' },
  { path: 'flat', component: FlatComponent },
  { path: 'hierarchical', component: HierarchicalComponent },
];
