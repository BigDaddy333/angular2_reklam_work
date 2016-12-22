import { Injectable } from '@angular/core';
import { Routes, RouterModule, CanActivate, Router } from '@angular/router';
import { HomeComponent } from './home';
import { LoginComponent, LoginService } from './login';
import { ProductComponent } from './products';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '',      component: LoginComponent },
  { path: 'home',  component: HomeComponent, canActivate: ['LoginRequired'] },
  { path: 'login',  component: LoginComponent },
  { path: 'products',  component: ProductComponent, canActivate: ['LoginRequired'] },
  { path: 'about', component: AboutComponent },
  // {
  //   path: 'detail', loadChildren: () => System.import('./+detail')
  //     .then((comp: any) => comp.default),
  // },
  { path: '**',    component: NoContentComponent },
];

 
@Injectable()
export class LoginRequired implements CanActivate {
    constructor(private router: Router, private loginService: LoginService) {
        
    }

    canActivate() {
      if(this.loginService.isLoggedIn() == true) {
          return true;
      } else {
          this.router.navigate(['login']);
          return false;
      }
    }
}