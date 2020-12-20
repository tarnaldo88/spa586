import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {OAuthService, AuthConfig} from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer : 'https://dev-2879688.okta.com/oauth2/default',
  redirectUri: window.location.origin+'/angFront/',
  responseType: 'id_token token',
  clientId : '0oa28wzrvNG7ucqsZ5d6'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngFront';

  constructor(private oauthService: OAuthService, http:HttpClient){
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this,oauthService.oidc = true;
    this.oauthService.setStorage(sessionStorage);
  }

  login(){
    console.log("inside login func");
    this.oauthService.initImplicitFlow();
    this.login();
  }
  logout(){
    this.oauthService.logOut();
  }
 getUsername(){
    const claims = this.oauthService.getIdentityClaims();
    if(!claims){
      return null;
    }
    return claims['name']; //in tut had claims['name'] but doesnt work right now for reasons unknown
  }
}
