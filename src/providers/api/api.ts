import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string = '';

  constructor(public http: HttpClient) {
    console.log(this.url);
  }

  validateSomething(text: string) {
    let urlComponent = encodeURIComponent(text);
    return this.get('http://172.31.100.53:8080/language-extraction?q=' + urlComponent);
  }

  createNewUser(name: string, country: string, email: string, skills: string[]) {
    let body = {
      name: name,
      country: country,
      email: email,
      skills: skills
    };
    return this.post(
      'http://172.31.100.65:8080/api/user',
      JSON.stringify(body)
    );
  }

  getUser(userId: string) {
    return this.get('http://172.31.100.65:8080/api/user/'+userId);
  }

  evaluateGitHubAccount(accountName: string) {
    return this.get('http://trust-trivago.espend.de/github-stats/'+accountName);
  }

  updateUser(userId: string, name: string, country: string, email: string, skills: string[]) {
    let body = {
      name: name,
      country: country,
      email: email,
      skills: skills
    };
    return this.put(
      'http://172.31.100.65:8080/api/user/'+userId,
      JSON.stringify(body)
    );
  }

  get(request_url: string, params?: any, reqOpts?: any) {
    console.log(this.url);
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params.set(k, params[k]);
      }
    }

    return this.http.get(request_url, reqOpts);
  }

  post(endpoint: string, body: any) {
    return this.http.post(
      endpoint,
      body,
      {headers: {'Content-Type': 'application/json'}}
    );
  }

  put(endpoint: string, body: any) {
    return this.http.put(
      endpoint,
      body,
      {headers: {'Content-Type': 'application/json'}}
    );
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + '/' + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }
}
