import { Component } from '@angular/core';

import '../src/cra-select.scss';

@Component({
  selector: 'app',
  templateUrl: 'demo/app.component.html'
})
export class AppComponent {
  items= [
    { id: 1, text: 'item 1'},
    { id: 2, text: 'item 2'},
    { id: 3, text: 'item 3'},
    { id: 4, text: 'item 4'},
    { id: 5, text: 'item 5'},
  ];
}
