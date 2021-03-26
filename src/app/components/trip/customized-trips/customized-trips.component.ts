import { Component, OnInit } from '@angular/core';
import {Place} from '../../../models/place';
import {PlaceService} from '../../../services/place.service';
import {FavoriteService} from '../../../services/favorite.service';
import {AuthenticationService} from '../../../services/authentication.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-customized-trips',
  templateUrl: './customized-trips.component.html',
  styleUrls: ['./customized-trips.component.scss']
})
export class CustomizedTripsComponent implements OnInit {
  places: Place[] = [];
  isFavorite: boolean[] = [];
  isLogged: boolean;
  queryParams: any = {};
  isLoaded = true;
  constructor(
    private _placeService: PlaceService,
    private _favoriteService: FavoriteService,
    private _Auth: AuthenticationService,
    private  _activatedRoute: ActivatedRoute
  ) {
  }
  ngOnInit(): void {
    this.isLoaded = true;
    this._Auth.status.subscribe(e => this.isLogged = e);
    this._activatedRoute.queryParamMap.subscribe((params: any) => {
      this.queryParams = params.params;
    });
    this._placeService.getCustom(`type=${this.queryParams.type || 'x'}
    &city=${this.queryParams.city || 'x'}
    &category=${this.queryParams.category || 'x'}
    &tag=${this.queryParams.tag || 'x'}
    &budget=${this.queryParams.budget || 'x'}`).subscribe((response: any) => {
      this.places = response.places;
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
}
