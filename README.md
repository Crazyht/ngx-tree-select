# Ngx-tree-select
[![Build Status](https://travis-ci.org/Crazyht/ngx-tree-select.svg?branch=dev)](https://travis-ci.org/Crazyht/ngx-tree-select)

## Features:
- a simple example library
- unit tests for the library
- a demo application that consumes the library in JIT mode and runs in watch mode
- an integration app that consumes the library in JIT and AOT mode and runs e2e tests

## Installation

This is how to install the components:

```bash
npm install ngx-tree-select
```

or

```bash
yarn add ngx-tree-select
```


And on your application module:

```ts
import {NgxTreeSelectModule} from 'ngx-tree-select';

@NgModule({
  declarations: [ ...],
  imports: [
    BrowserModule,
    ....,
    NgxTreeSelectModule
],
})
export class AppModule { }
```

See below for SystemJs / UMD installation.

# Using the Tree Select

We will need to add first a version of Font Awesome to our page, for example:

```html
<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
```

Then we can use the Tree Select like this:

```html
<span>Simple select : </span>
<tree-select [items]="items" idField="id" textField="text" [allowFilter]="false" [(ngModel)]="selectedItems1"></tree-select>
<span>Selected id : {{selectedItems1?.id}}</span>
<hr>

<span>Multiple select : </span>
<tree-select [items]="items" idField="id" textField="text" multiple="true" [(ngModel)]="selectedItems2" filterPlaceholder="Type item filter..."></tree-select>
<span>Selected ids :</span>
<ul>
        <li *ngFor="let itm of selectedItems2">{{itm.id}}</li>
</ul>
<hr>

<span>Simple Tree select : </span>
<tree-select [items]="itemsTree" idField="id" textField="text" childrenField="children" [(ngModel)]="selectedItems3"></tree-select>
<span>Selected id : {{selectedItems3?.id}}</span>
<hr>

<span>Multiple Tree select : </span>
<tree-select [items]="itemsTree" idField="id" textField="text" childrenField="children" multiple="true" [(ngModel)]="selectedItems4"></tree-select>
<span>Selected ids :</span>
<ul>
        <li *ngFor="let itm of selectedItems4">{{itm.id}}</li>
</ul>
<hr>
```


# Running the Demo Application
This command will build and start the demo application:

```bash
npm start
```

# Running This Module In Development

First let's build the library using this command:

```bash
npm run build
```


Then let's link it:

```bash
cd dist
npm link
```


On another folder on the same machine where we have for example a running Angular CLI, we then do:

```bash
npm link ngx-tree-select
```


# Running the Tests

The tests can be executed with the following commands:

```bash
npm test
npm integration
```

## Using SystemJs via the UMD bundle ?

Make sure to add this to your `map` configuration, if you need the module served from a CDN:

```javascript
map: {

   ...
   'ngx-tree-select': 'https://unpkg.com/ngx-tree-select@<version number>/ngx-tree-select.umd.min.js'
}
```

Otherwise if serving from `node_modules`directly:

```javascript
map: {
   ...
   'ngx-tree-select': 'node_modules/ngx-tree-select/bundles/ngx-tree-select.umd.min.js'
}
```

And in our packages property:

```javascript
packages: {
   ...
  'ngx-tree-select': {
    main: 'index.js',
    defaultExtension: 'js'
  }

}
```


# License

[MIT](https://opensource.org/licenses/MIT)
