import { browser, by, element } from 'protractor';

describe('App', () => {

  beforeEach(() => {
    // change hash depending on router LocationStrategy
    browser.get('/#/product');
  });


  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'Angular2 Webpack Starter by @gdi2290 from @AngularClass';
    expect(subject).toEqual(result);
  });

  it('should have `Products` x-large', () => {
    let subject = element(by.css('[x-large]')).getText();
    let result  = 'Products';
    expect(subject).toEqual(result);
  });


});
