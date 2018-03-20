import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map'
import { Http, Response, URLSearchParams } from '@angular/http';
export const now = (): number => Math.floor((new Date()).getTime() / 1000);

export const isExpired = (createTime: number, ttl: number, currentTime: number): boolean => currentTime >= (createTime + ttl);


export interface AuthorizationGrant {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    createdAt: number;
}

export interface IdentityClaim {
    username?: string;
    mdn?: string;
}

export interface AuthCredentials {
    username: string;
    password: string;
}

@Injectable()
export class AuthService {

  private _http: Http;
  private token: BehaviorSubject<string>;

  private _tokenIsBeingRefreshed: Subject<boolean>;
  public TokenIsBeingRefreshed: Observable<boolean>;
  public isUpdating = false;

  constructor(
    http: Http
  ) {
    this._http = http;

    this.token = new BehaviorSubject<string>('');

    this._tokenIsBeingRefreshed = new Subject<boolean>();
    this.TokenIsBeingRefreshed = this._tokenIsBeingRefreshed.asObservable();
    this._tokenIsBeingRefreshed.next(false);
  }

  getToken(): string | false {
    return this.token.getValue();
  }

//   isAuthenticated(): boolean {
//     let grant: AuthorizationGrant;
//     try {
//       grant = this._store.read(); // will throw if AuthGlob not found
//       if (isExpired(grant.createdAt, grant.expires_in, now())) {
//         throw new Error('Expired token!');
//       }
//     } catch (e) {
//       // console.warn(e);
//       this.token.next(null);
//       return false;
//     }
//     return true;
//   }

  deleteToken() {
    this.token.next(null);
  }


//   refreshToken(): Observable<Response> {
//     let userAuth = this._store.read();
//     let self = this;
//     const apiUrl = `${this.config.config.baseUrl}/prepaid/authentication/1.0/web-refresh-token`;
//     const body = {
//       "refresh_token": userAuth.refresh_token
//     };
//     self._tokenIsBeingRefreshed.next(true);
//     self.isUpdating = true;
//     return self._http.post(apiUrl, body).map(res => res.json()).do(
//       val => {
//         userAuth.access_token = val.access_token;
//         userAuth.refresh_token = val.refresh_token;
//         userAuth.expires_in = val.expires_in;
//         self._store.update(userAuth);

//         let userStore = new CookieStorage();
//         let userProfile = JSON.parse(userStore.getItem('userProfile'));
//         let profileData = Object.assign({}, userProfile, { 'expires_in': val.expires_in });
//         userStore.setItem('userProfile', JSON.stringify(profileData));

//         self.isUpdating = false;
//         self._tokenIsBeingRefreshed.next(false);
//       },
//       err => {
//         self._tokenIsBeingRefreshed.next(false);
//         console.log(err);
//         //TODO: error, timeout, handle me!
//       }
//     );

//   }

  /**
   * authenteicate()
   * fetch the token directly without request object
   */
    authenticate(): Observable<any> {
        const self = this;
        self._tokenIsBeingRefreshed.next(true);
        self.isUpdating = true;
        const authServerUrl = 'http://ip-10-134-20-45.ec2.internal:8880/auth';
        const openIdUrl = authServerUrl + '/realms/DecisionSpace_Integration_Server/protocol/openid-connect/token';
        const data = new URLSearchParams();
        data.append('grant_type', 'password');
        data.append('username', 'fwuser');
        data.append('password', 'fwuser');
        data.append('client_id', 'bhdm');
        data.append('client_secret', 'd2f1f6a8-c72b-426a-9491-e2418324eced');
        return this._http.post(openIdUrl, data)
                .map(res => res.json())
                .do(token => {
                    this.token.next('Bearer ' + token.access_token);
                    self._tokenIsBeingRefreshed.next(false);
                    self.isUpdating = false;
                });
    }

    authUser(): Observable<any> {
      const self = this;
      self._tokenIsBeingRefreshed.next(true);
      self.isUpdating = true;
      return this._http.get('/currentuser')
        .map(res => res.json())
        .do(user => {
            this.token.next('Bearer ' + user.token);
            self._tokenIsBeingRefreshed.next(false);
            self.isUpdating = false;
        });
    }

}