import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {OAuthService, AuthConfig} from 'angular-oauth2-oidc';

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
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {

  authors: Authors[] = [];
  constructor(private httpClient: HttpClient, private oauthService: OAuthService){
      this.oauthService.configure(authConfig);
      this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  ngOnInit(): void {
    this.getAuthors();
  }

  getAuthors(){
    this.httpClient.get<any>('http://54.67.104.178/Server/api/Authors').subscribe(
      response => {
        console.log(response);
        this.authors = response;
      }
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
  getName(){
    return this.oauthService.getIdentityClaims();
  }
}
