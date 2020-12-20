import { Component, OnInit } from '@angular/core';
import {OAuthService, AuthConfig} from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer : 'https://dev-2879688.okta.com/oauth2/default',
  redirectUri: window.location.origin,
  clientId : "0oa28wzrvNG7ucqsZ5d6",
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private oauthService: OAuthService){
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    // this.login();
    // this.getUsername();
    // this.logout();
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
      let str = "";
      str = claims['name'];
      return str; 
    }
  }

  ngOnInit(): void {
  }

}
