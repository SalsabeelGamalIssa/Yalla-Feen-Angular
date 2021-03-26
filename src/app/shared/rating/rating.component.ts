import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PlaceService} from '../../services/place.service';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  @Input() stars: number = 4;
  @Input() placeID: string;
  isRated: boolean = false;
  isLogged: boolean;
  constructor(private _PlaceService: PlaceService, private _authentication: AuthenticationService, private _router: Router) {
  }
  ngOnInit(): void {
    this._authentication.status.subscribe(e => this.isLogged = e);
  }
  changeRating(newStars: number) {
    if (!this.isLogged){
      this._router.navigateByUrl('user/login');
    }else{
      this._PlaceService.addRating(this.placeID, {rate_value: newStars}).subscribe((response: any) => {
        this.isRated = true;
        setTimeout(() => {
          this.isRated = false;
        }, 3000);
        this.stars = response.place.rates;
      }, () => {
      });
    }
  }
}
