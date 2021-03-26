import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _httpClient: HttpClient) {
  }
  // tslint:disable-next-line:typedef
  get(url: string) {
    return this._httpClient.get(`${environment.apiURL}${url}`);
  }
  // tslint:disable-next-line:max-line-length
  getWithToken(url: string) {return this._httpClient.get(`${environment.apiURL}${url}`, {headers: new HttpHeaders({'x-access-token': localStorage.getItem('token')||""})});
  }
  // tslint:disable-next-line:typedef
  post(url: string, body: any) {
    return this._httpClient.post(`${environment.apiURL}${url}`, body);
  }
  postWithToken(url: string,body:any) {return this._httpClient.post(`${environment.apiURL}${url}`,body, {headers: new HttpHeaders({'x-access-token': localStorage.getItem('token')||""})});
  }
  postWithTokenFav(url: string) {return this._httpClient.post(`${environment.apiURL}${url}`, {}, {headers: new HttpHeaders({'x-access-token': localStorage.getItem('token')||""})});
  }
  // tslint:disable-next-line:typedef
  PUT(url: string, body: any) {
    return this._httpClient.put(`${environment.apiURL}${url}`, body);
  }
  putWithToken(url: string,body:any) {return this._httpClient.put(`${environment.apiURL}${url}`,body, {headers: new HttpHeaders({'x-access-token': localStorage.getItem('token')||""})});
  }
  // tslint:disable-next-line:typedef
  delete(url: string) {
    return this._httpClient.delete(`${environment.apiURL}${url}`);
  }
  deleteWithToken(url: string) {return this._httpClient.delete(`${environment.apiURL}${url}`, {headers: new HttpHeaders({'x-access-token': localStorage.getItem('token')||""})});
}

}
