import {Component, OnInit} from '@angular/core';
import {Place} from '../../../models/place';
import {PlaceService} from '../../../services/place.service';
import { FavoriteService } from '../../../services/favorite.service';
import {AuthenticationService} from '../../../services/authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-top-rated',
  templateUrl: './top-rated.component.html',
  styleUrls: ['./top-rated.component.scss']
})
export class TopRatedComponent implements OnInit {
  places: Place[] = [];
  isFavorite: boolean[] = [];
  isLogged: boolean;
  notEmptyPost = true;
  notscrolly = true;
  skip: number = 0;
  spinning = false;
  limit = 4;
  constructor(
    private spinner: NgxSpinnerService,
    private _placeService: PlaceService,
    private _favoriteService: FavoriteService,
    private _Auth: AuthenticationService) {
  }
  ngOnInit(): void {
    this._Auth.status.subscribe(e => this.isLogged = e);
    this._placeService.getPagination(this.skip, this.limit).subscribe((response: any) => {
      this.skip = this.skip + this.limit;
      this.places = response.data;
      if (this.isLogged){
        for (const place of this.places){
          this._favoriteService.isFav(place._id).subscribe(() => {
            this.isFavorite.push(true);
          }, () => {
            this.isFavorite.push(false);
          });
        }
      }
    } , error => {
      console.log(error);
    });
  }
  onScroll() {
    if (this.notscrolly && this.notEmptyPost) {
      this.spinning = true;
      this.spinner.show();
      this.notscrolly = false;
      this.loadNextPost();
    }
  }
// load th next 20 posts
  loadNextPost() {
    this.spinning = true;
    this._placeService.getPagination(this.skip, this.limit)
      .subscribe( (data: any) => {
        this.skip = this.skip + this.limit;
        this.spinning = false;
        // const newPost = data.data[0];
        this.spinner.hide();
        // add newly fetched posts to the existing post
        this.places = this.places.concat(data.data);
        this.notscrolly = true;
      }, (error => {
        this.notEmptyPost =  false;
        this.spinning = false;
        this.spinner.hide();
      }));
  }
}
