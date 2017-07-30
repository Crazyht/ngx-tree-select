import { browser, by, element } from 'protractor';
import 'tslib';

describe('App', () => {

  beforeEach(async () => {
    await browser.get('/');
  });

  afterEach(() => {
    browser.manage().logs().get('browser').then((browserLog: any[]) => {
      expect(browserLog).toEqual([]);
    });
  });

  it('should have <tree-select>', async () => {
    const subject = await element(by.css('tree-select')).isPresent();
    expect(true).toBeTruthy(subject);
  });
});
