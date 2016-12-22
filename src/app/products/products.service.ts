import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }       from 'rxjs/Observable';
import { LoginService } from '../login/login.service';


@Injectable()
export class ProductService {  
  // Product Http Request URL
  private productsUrl = 'http://api.reklambutiken.com/v1/products'; 
  
  constructor(private http: Http , private loginService: LoginService) {
  }
      
  // get Products details
  getProducts():Observable<any[]>{
    // get Token
    console.log(LoginService.loggedInUser);
    let token = LoginService.loggedInUser['token'];
    // Get Products
    var headers = new Headers();
    headers.append('Authorization', token);
    console.log(headers);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.productsUrl, options)
      .map(this.processData);
  }
  
  processData(res: Response) {
      let data = res.json();     
      return data ||{};
  }

  getIndividualProduct(data:any):Observable<any[]>{
    let  individualProductsUrl = "http://api.reklambutiken.com/v1/products/"+data.id;

    let token = LoginService.loggedInUser['token'];
    var headers = new Headers();
    headers.append('Authorization', token);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(individualProductsUrl, options)
      .map(this.processData);

  }


  updateIndividualProduct(data:any):Observable<any[]>{
    let  individualProductsUrl = "http://api.reklambutiken.com/v1/products/"+data.id;

    let token = LoginService.loggedInUser['token'];
    var headers = new Headers();
    headers.append('Authorization', token);
    let options = new RequestOptions({ headers: headers });
    return this.http.put(individualProductsUrl, data , options)
      .map(this.processData);

  }

}
