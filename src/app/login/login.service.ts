import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }       from 'rxjs/Observable';
import { LoggedInUser }       from './login.model';

@Injectable()
export class LoginService {  
  // Login Http Request URL
  private loginUrl = 'http://api.reklambutiken.com/v1/login'; 
  public static loggedInUser = {};  
  constructor(private http: Http) {
   
  }

  
  // login and set logged in user details
  login(username,password):Observable<LoggedInUser> {
    // Authentication request
    
    // reset User
    LoginService.loggedInUser= {};
    var creds = { "username": username, "password": password };   
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    console.log("Trying login with credentials:", creds);
    return this.http.post(this.loginUrl, creds, {
      headers: headers
    })
    .map(this.processData)
    .catch(this.handleError.bind(this));
  }
  
  processData(res: Response) {
      console.log('Authentication Success');
      let data = res.json();

      if(data)
        LoginService.loggedInUser={userData:data,loggedIn:true,token:data.token};
      
      return LoginService.loggedInUser ||{};
  }

  handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    console.log("error response for login request:", error);  
    return Observable.throw({});
  }

  get(prop?: any) {
    // use our state getter for the clone    
    return LoginService.loggedInUser.hasOwnProperty(prop) ? LoginService.loggedInUser[prop] : LoginService.loggedInUser;
  }

  set(prop: string, value: any) {
    // internally mutate our state
    return LoginService.loggedInUser[prop] = value;
  }

  public isLoggedIn(): boolean {
    if(localStorage.getItem("id_token")&& localStorage.getItem("isLoggedIn")){
      LoginService.loggedInUser ={loggedIn:true,token:localStorage.getItem("id_token")}
      return true;
    }else{
      return false;
    }
    // return (LoginService.loggedInUser['loggedIn'] == true);
  }


  private _clone(object: LoggedInUser) {
    // simple object clone
    return JSON.parse(JSON.stringify( object ));
  }
}
