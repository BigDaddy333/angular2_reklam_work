import { Component ,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { XLarge } from './x-large';
import { LoginService } from './login.service';
import {Observable} from 'rxjs/Rx';
import { LoggedInUser }       from './login.model';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'login'
  selector: 'login',  // <login></login>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [LoginService],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './login.component.scss' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  // Set our default values
  username = '';
  password = '';
  loggedInUser={};
  // TypeScript public modifiers
  constructor(private loginService: LoginService, private router: Router) {

  }

  ngOnInit() {
    if (this.loginService.isLoggedIn()) {
      this.router.navigateByUrl('/products')
    }
  }

  submitLogin() {
    let loginOperation:Observable<LoggedInUser>;
    loginOperation=this.loginService.login(this.username,this.password);
    // Subscribe to observable
    loginOperation.subscribe(this.onLogin.bind(this), this.onLoginError.bind(this));

  }

  onLogin(data) {
    console.log('loggedIn User');
    this.loggedInUser = data;
    localStorage.setItem("id_token",data.token);
    localStorage.setItem("isLoggedIn",data.loggedIn);
    this.router.navigate(['products']); 

  }
  onLoginError(err) {
    // Log errors if any
    alert("Could not log in with the given credentials");
    console.log(err);
  }
}
