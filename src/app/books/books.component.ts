import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {OAuthService, AuthConfig} from 'angular-oauth2-oidc';

export class Books {
  constructor(
    public BookId: number,
    public AuthorId: number,
    public title: string,
    public price: number
  ) {
  }
}

export class Authors {
  constructor(
    public AuthorId: number,
    public Name: string
  ) {
  }
}

export const authConfig: AuthConfig = {
  issuer : 'https://dev-2879688.okta.com/oauth2/default',
  redirectUri: window.location.origin,
  clientId : "0oa28wzrvNG7ucqsZ5d6",
}

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: Books[] = [];
  authors: Authors[] = [];
  constructor(
    private httpClient: HttpClient,
    private oauthService: OAuthService
  ) { 
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  ngOnInit(): void {
    this.getBooks();
    this.getAuthors();
  }

  getBooks(){
    this.httpClient.get<any>('http://13.52.231.44/Server/api/Books').subscribe(
      response => {
        console.log(response);
        this.books = response;
      }
    );
  }

  getAuthors(){
    this.httpClient.get<any>('http://13.52.231.44/Server/api/Authors').subscribe(
      response => {
        console.log(response);
        this.authors = response;
      }
    );
  }

  postAuthor(data: string){
    let jsonData = JSON.stringify(
      {name: data}
    );
  }

  login(){
    console.log("inside login func");
    this.oauthService.initImplicitFlow();
  }
  logout(){
    this.oauthService.logOut();
  }
  getUsername(){
    const claims = this.oauthService.getIdentityClaims();
    
    if(!claims){
      return null;
    }else {
      //in tut had claims['name'] but doesnt work right now for reasons unknown   
      console.log(claims);   
      return claims; 
    }
  }
  //chosenAuth: Author;
  authorId: 0;

  // showAuth(selected: Author){
  //   if(this.chosenAuth != selected){
  //     this.chosenAuth = selected;
  //     this.authorId = selected.authorId;
  //   }
  // }
}
