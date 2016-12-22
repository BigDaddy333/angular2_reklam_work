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
import { LoginComponent } from './login.component';

describe('Login', () => {
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
      LoginComponent
    ]
  }));

  it('password should have default data', inject([ LoginComponent ], (login: LoginComponent) => {
    expect(login.password).toEqual('');
  }));
    
  it('username should have default data', inject([ LoginComponent ], (login: LoginComponent) => {
    expect(login.username).toEqual('');
  })); 

  it('should log submitLogin', inject([ LoginComponent ], (login: LoginComponent) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    login.submitLogin();
    expect(console.log).toHaveBeenCalled();
  }));

});
