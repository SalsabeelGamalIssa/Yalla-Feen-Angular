import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  constructor(private _apiService: ApiService) { }
  create(place: any)
  {
   return this._apiService.postWithToken('place/create', place);
  }
  update(place: any, id: string)
  {
   return this._apiService.putWithToken(`place/update/${id}`, place);
  }
  get()
  {
   return this._apiService.get('place/top');
  }
  getAdv()
  {
    return this._apiService.get('advertise/list');
  }
  getPagination(skip: number, limit: number)
  {
    return this._apiService.get(`place/top?skip=${skip}&limit=${limit}`);
  }
  getUserPlaces()
  {
   return this._apiService.getWithToken('place/my-places');
  }
  getDetails(id: string)
  {
   return this._apiService.get(`place/details/${id}`);
  }
  delete(id: string)
  {
   return this._apiService.deleteWithToken(`place/delete/${id}`);
  }
  addComment( place_id: string, comment: any){
    return this._apiService.postWithToken(`place/create-comment/${place_id}`, comment);
  }
  addRating( placeID: string, rating: any){
    return this._apiService.postWithToken(`place/add-rating/${placeID}`, rating);
  }
  getPlaceByTitle(title: string){
    return this._apiService.get(`place/place-title/${title}`);
  }
  getCustom(params: any){
    return this._apiService.get('place/search?' + params);
  }
  getRelatedPlaces(category_id: string){
    return this._apiService.get(`place/related/${category_id}`);
  }
}
