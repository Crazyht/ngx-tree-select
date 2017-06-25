import { browser, element, by } from 'protractor';

describe('QuickStart Lib E2E Tests', function () {

  beforeEach(() => browser.get(''));

  afterEach(() => {
    browser.manage().logs().get('browser').then((browserLog: any[]) => {
      expect(browserLog).toEqual([]);
    });
  });

  it('should display tree select', () => {
    expect(element(by.css('tree-select'))).toBeTruthy();
  });
});
