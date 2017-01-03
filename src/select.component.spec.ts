import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrazySelectModule } from './crazy-select.module';

const html = ``;

describe('Component: ng2-select', () => {
  let fixture: ComponentFixture<any>;
  let context: TestSelectComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestSelectComponent],
      imports: [CrazySelectModule]
    });
    TestBed.overrideComponent(TestSelectComponent, {set: {template: html}});
    fixture = TestBed.createComponent(TestSelectComponent);
    context = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('fixture should not be null', () => {
    expect(fixture).not.toBeNull();
  });
});

@Component({
  selector: 'select-test',
  template: '<fq-tree-select></fq-tree-select>'
})

class TestSelectComponent {
}