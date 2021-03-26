import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private _apiService:ApiService) { }


  addComment(comment: any)
  {
   return this._apiService.postWithToken('place/create', comment);
  }
  updateComment(id:string,comment: any)
  {
   return this._apiService.putWithToken(`comment/update/${id}`, comment);
  }
  getAllComments()
  {
   return this._apiService.get('place');
  }
  getUserComment()
  {
   return this._apiService.getWithToken('place');
  }
  getDetails(id: string)
  {
   return this._apiService.get(`place/details/${id}`);
  }
  delete(id: string)
  {
   return this._apiService.deleteWithToken(`comment/delete/${id}`);
  }
}
