import { Injectable } from '@angular/core';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _apiService: ApiService) { }
  getAllCategories()
  {
    return this._apiService.get('category/list');
  }
  getAllTags(categoryID: any){
    return this._apiService.get(`category/tags/${categoryID}`);
  }
}
