import { Component } from '@angular/core';

import '../src/cra-select.scss';

@Component({
  selector: 'demo-app',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  items= [
    { id: 1, text: 'item 1'},
    { id: 2, text: 'item 2'},
    { id: 3, text: 'item 3'},
    { id: 4, text: 'item 4'},
    { id: 5, text: 'item 5'},
  ];

  itemsTree = [
    {id: 10, text: 'item 1', children: [
      {id: 11, text: 'item 1.1'},
      {id: 12, text: 'item 1.2'},
      {id: 13, text: 'item 1.3'},
    ]},
    {id: 20, text: 'item 2', children: [
      {id: 21, text: 'item 2.1'},
      {id: 22, text: 'item 2.2'},
      {id: 23, text: 'item 2.3'},
    ]},
    {id: 33, text: 'item 3', children: []},
  ];

}
