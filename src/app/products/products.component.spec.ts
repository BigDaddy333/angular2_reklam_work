import {
  inject,
  TestBed
} from '@angular/core/testing';
import { Component } from '@angular/core';
import {
  BaseRequestOptions,
  ConnectionBackend,
  Http
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

// Load the implementations that should be tested
import { ProductComponent } from './product.component';

describe('Product', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      BaseRequestOptions,
      MockBackend,
      {
        provide: Http,
        useFactory: function(backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
          return new Http(backend, defaultOptions);
        },
        deps: [MockBackend, BaseRequestOptions]
      },
      ProductComponent
    ]
  }));

  it('password should have default data', inject([ ProductComponent ], (product: ProductComponent) => {
    expect(product.products).toEqual([]);
  }));
    

  it('should log getProducts', inject([ ProductComponent ], (product: ProductComponent) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    product.getProducts('token');
    expect(console.log).toHaveBeenCalled();
  }));

});
