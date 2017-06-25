import { Component } from '@angular/core';

@Component({
  selector: 'integration-app',
  templateUrl: './app.component.html',
})
export class AppComponent {

  public selectedItems1: any = {};

  public selectedItems2: any[] = [
     { id: 1, text: 'item 1'},
     { id: 2, text: 'item 2'}
  ];

   public selectedItems3: any = {id: 11, text: 'item 1.1'};

   public selectedItems4: any[] = [
     {id: 21, text: 'item 2.1'},
     {id: 22, text: 'item 2.2'},
     {id: 23, text: 'item 2.3'}
  ];

  public disabledSelectedItems1: any = { id: 1, text: 'item 1'};

  public disabledSelectedItems2: any[] = [
     { id: 1, text: 'item 1'},
     { id: 2, text: 'item 2'}
  ];

   public disabledSelectedItems3: any = {id: 11, text: 'item 1.1'};

   public disabledSelectedItems4: any[] = [
     {id: 21, text: 'item 2.1'},
     {id: 22, text: 'item 2.2'},
     {id: 23, text: 'item 2.3'}
  ];

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
    {id: 30, text: 'item 3', children: []},
  ];

}

