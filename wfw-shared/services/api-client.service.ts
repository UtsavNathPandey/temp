import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptionsArgs, Headers, Response } from '@angular/http';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/concatMap';

export interface HttpSubset {
    get(url: string, options?: RequestOptionsArgs): Observable<Response>;
    post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>;
    put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>;
    delete(url: string, options?: RequestOptionsArgs): Observable<Response>;
    patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>;
}

export interface ApiConfig {
    baseUrl?: string;
    headers: {[k: string]: string};
}

@Injectable()
export class ApiClientService implements HttpSubset {

  private readonly _authHeaderField = 'Authorization';
  noJwtError: boolean;
  noClientCheck: boolean;
  // private _config: any;

  constructor(
    private _http: Http,
    private _auth: AuthService
  ) {
    if (location.hostname === 'localhost' || location.hostname === '127.0.0.1' || location.hostname === '') {
      this._auth.authenticate().subscribe(() => { });
    } else {
      this._auth.authUser().subscribe(() => { });
    }
  }

  get(url: string, options?: RequestOptionsArgs, newBase?: string): Observable<Response> {
    const baseUrl = newBase ? newBase : undefined,
      decoratedOptions = newBase ? this._acceptOptions(options) : this._decorateOptions(options);

    if (!this._auth.isUpdating) {
      return this._http.get(this._decorateUrl(url, baseUrl), decoratedOptions);
    } else {
      return this._auth.TokenIsBeingRefreshed.concatMap(() => {
        return this._http.get(
          this._decorateUrl(url, baseUrl),
          (newBase ? this._acceptOptions(options) : this._decorateOptions(options))
        );
      });
    }
  }

  post(url: string, body: any, options?: RequestOptionsArgs, newBase?: string): Observable<Response> {
    const baseUrl = newBase ? newBase : undefined,
      decoratedOptions = newBase ? this._acceptOptions(options, body) : this._decorateOptions(options, body);

    if (!this._auth.isUpdating) {
      return this._http.post(this._decorateUrl(url, baseUrl), body, decoratedOptions);
    } else {
      return this._auth.TokenIsBeingRefreshed.concatMap(() => {
        return this._http.post(
          this._decorateUrl(url, baseUrl),
          body,
          (newBase ? this._acceptOptions(options, body) : this._decorateOptions(options, body))
        );
      });
    }
  }

  put(url: string, body: any, options?: RequestOptionsArgs, newBase?: string): Observable<Response> {
    const baseUrl = newBase ? newBase : undefined,
      decoratedOptions = newBase ? this._acceptOptions(options, body) : this._decorateOptions(options, body);

    if (!this._auth.isUpdating) {
      return this._http.put(this._decorateUrl(url, baseUrl), body, decoratedOptions);
    } else {
      return this._auth.TokenIsBeingRefreshed.concatMap(() => {
        return this._http.put(
          this._decorateUrl(url, baseUrl),
          body,
          (newBase ? this._acceptOptions(options, body) : this._decorateOptions(options, body))
        );
      });
    }
  }

  delete(url: string, options?: RequestOptionsArgs, newBase?: string): Observable<Response> {
    const baseUrl = newBase ? newBase : undefined,
      decoratedOptions = newBase ? this._acceptOptions(options) : this._decorateOptions(options);
    if (!this._auth.isUpdating) {
      return this._http.delete(this._decorateUrl(url, baseUrl), decoratedOptions);
    } else {
      return this._auth.TokenIsBeingRefreshed.concatMap(() => {
        return this._http.delete(
          this._decorateUrl(url, baseUrl),
          (newBase ? this._acceptOptions(options) : this._decorateOptions(options))
        );
      });
    }
  }

  patch(url: string, body: any, options?: RequestOptionsArgs, newBase?: string): Observable<Response> {
    const baseUrl = newBase ? newBase : undefined,
      decoratedOptions = newBase ? this._acceptOptions(options, body) : this._decorateOptions(options, body);

    if (!this._auth.isUpdating) {
      return this._http.patch(this._decorateUrl(url, baseUrl), body, decoratedOptions);
    } else {
      return this._auth.TokenIsBeingRefreshed.concatMap(() => {
        return this._http.patch(
          this._decorateUrl(url, baseUrl),
          body,
          (newBase ? this._acceptOptions(options, body) : this._decorateOptions(options, body))
        );
      });
    }
  }

  request(url: string, options?: RequestOptionsArgs, newBase?: string): Observable<Response> {
    const baseUrl = newBase ? newBase : undefined,
      decoratedOptions = newBase ? this._acceptOptions(options) : this._decorateOptions(options);
    if (!this._auth.isUpdating) {
      return this._http.request(this._decorateUrl(url, baseUrl), decoratedOptions);
    } else {
      return this._auth.TokenIsBeingRefreshed.concatMap(() => {
        return this._http.request(
          this._decorateUrl(url, baseUrl),
          (newBase ? this._acceptOptions(options) : this._decorateOptions(options))
        );
      });
    }
  }

  private _authHeader() {
    const authHeader = {};
    const token = this._auth.getToken();
    if (token) {
      authHeader[this._authHeaderField] = token;
    }
    return authHeader;
  }

  private _headers(hasBody: boolean, overrides: { [k: string]: string } = {}): Headers {

    let optHeaders: any;
    if (hasBody) {
      optHeaders = {
        'Content-Type': 'application/json'
      };
    }

    return new Headers(Object.assign({},
        optHeaders, this._authHeader(), overrides
    ));
  }

  private _decorateUrl(url: string, baseUrl?: string): string {
    const baseURL = baseUrl ? baseUrl : '';

    return baseURL + url;
  }

  private _decorateOptions(options?: RequestOptionsArgs, body?: {}): RequestOptionsArgs {

    const hasBody: boolean = ((options && options.body) || body) ? true : false;

    if (!options) {
      return { headers: this._headers(hasBody) };
    }

    if (!options['headers']) {
      return Object.assign({}, options, { headers: this._headers(hasBody) });
    }

    const headers = new Headers(Object.assign({}, options.headers, this._headers(hasBody)));
    return Object.assign({}, options, { headers });
  }

  private _acceptOptions(options?: RequestOptionsArgs, body?: {}): RequestOptionsArgs {

    const hasBody: boolean = ((options && options.body) || body) ? true : false;

    if (!options) {
      return { headers: this._headers(hasBody) };
    }

    if (!options['headers']) {
      return Object.assign({}, options, { headers: this._headers(hasBody) });
    }

    const headers = new Headers(Object.assign({}, options.headers));
    return Object.assign({}, options, { headers });
  }

}
