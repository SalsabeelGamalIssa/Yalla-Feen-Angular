import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private isLoggedSource = new BehaviorSubject(false);
  status = this.isLoggedSource.asObservable();
  constructor(private _apiService: ApiService) {
    const token = localStorage.getItem('token');
    token ? this.changeStatus(true) : this.changeStatus(false);
  }
  editProfile(user:any){
    return this._apiService.putWithToken('user/edit-profile', user);
  }
  changeStatus(isLogged: boolean) {
    this.isLoggedSource.next(isLogged);
  }
  login(user: {email: string, password: string}){
    return this._apiService.post(`user/login`, user);
  }
  signup(user: any){
    return this._apiService.post(`user/signup`, user);
  }
  logout() {
    localStorage.removeItem('token');
    this.changeStatus(false);
    console.log(this.status);
  }
  isLoggedCheck(){
    const token = localStorage.getItem('token');
    token ? this.changeStatus(true) : this.changeStatus(false);
  }

 forgetpassword(email: string){
  return this._apiService.post('user/forget-password',{"email":email});
 }
 check_token(email: string, token: string){
  return this._apiService.post('user/check-token',{"email":email,"reset_token":token});
 }
  //fain reset password ya ba4aaaaar!!!!
  resetPassword(email: string, token: string, password: any){
    return this._apiService.post('user/reset-password-token',{"email":email,"reset_token":token,"newPassword":password});
  }
  change_Profilepicture(image:any){
    console.log("at service to upload image");
    
    console.log((image));
    
    return this._apiService.postWithToken('user/upload-profile-pic',image);
  }

  
}
