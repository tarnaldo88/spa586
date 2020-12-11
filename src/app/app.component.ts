import { Component } from '@angular/core';
import {OAuthService, AuthConfig} from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer : 'https://dev-2879688.okta.com/oauth2/default',
  redirectUri: window.location.origin,
  clientId : "0oa28wzrvNG7ucqsZ5d6"
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngFront';

  constructor(private oauthService: OAuthService){
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  login(){
    console.log("inside login func");
    this.oauthService.initImplicitFlow();
  }
  logout(){
    this.oauthService.logOut();
  }
 get getUsername(){
    const claims = this.oauthService.getIdentityClaims();
    if(!claims){
      return null;
    }
    return claims; //in tut had claims['name'] but doesnt work right now for reasons unknown
  }
}
