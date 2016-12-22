import { Component } from '@angular/core';
import { XLarge } from './x-large';
import { Router } from '@angular/router';
import { ProductService } from './products.service';
import {Observable} from 'rxjs/Rx';
import { LoginService } from '../login/login.service';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'products'
  selector: 'products',  // <products></products>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [LoginService,ProductService],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './products.component.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './products.component.html'
})
export class ProductComponent {
  // Set our default values
  products = [];
  individualProduct:{};
  notEditing:Boolean =true;
  productEdit:any={};
  selectedProduct :any ={};
  // TypeScript public modifiers
  constructor(private productService: ProductService , private _router: Router) {

  }

  ngOnInit() {
    console.log('hello `Product` component');
    this.getProducts();
    this.notEditing = true;
  }
    
  ngOnChanges() {
    console.log('`Product` on Changes');
    this.getProducts();
  }

  logoutUser():void{
    localStorage.clear();
    this._router.navigateByUrl('/login')
  }

  getProducts() {
    let productsOperation:Observable<any>;     
    productsOperation=this.productService.getProducts();
    // Subscribe to observable
    productsOperation.subscribe(
        data => {
            console.log('products received');
            console.log(data);
            this.products = data.products;
            this.setProducts(this.products);

        }, 
        err => {
            // Log errors if any
            console.log(err);
        });

  }

  setSelectedProduct(product:any):void{
    console.log(" The product selected is ",product);
    this.selectedProduct = product;
    this.toggleEdit();

  }

  cancelUpdate():void{
    this.toggleEdit();
  }

  updateProduct():void{

let productsUpdation:Observable<any>;  
    productsUpdation=this.productService.updateIndividualProduct(this.selectedProduct);


    productsUpdation.subscribe(
        data => {
            var self =  this;
            this.products.forEach(function(element, index, array){
              if(data.id == element.id){
                self.products[index]=data;
              }
              //console.log("array",array);
            })
            this.toggleEdit();                               
        }, 
        err => {
            // Log errors if any
            console.log(err);
        });


  }


  toggleEdit():void{
    this.notEditing = !this.notEditing;
  }

  setProducts(productArray:any):void{
     /*this.fetchIndividualProduct(productArray[0]);*/
     let self = this;
     this.products.forEach(function(element, index){
       self.fetchIndividualProduct(element);
     })
  }


  fetchIndividualProduct(product:any):void{

    let productsUpdation:Observable<any>;  
    productsUpdation=this.productService.getIndividualProduct(product);


    productsUpdation.subscribe(
        data => {
           // this.individualProduct = data.products; 
            this.updateProductData(data);                                
        }, 
        err => {
            // Log errors if any
            console.log(err);
        });
  }

  updateProductData(newProductDetails:any):void{
    var self = this;
    this.products.forEach(function(element, index, array){
              if(newProductDetails.id == element.id){
                self.products[index]=newProductDetails;
              }
            })
  }
}
