import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {PlaceService} from '../../services/place.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isAdvertise: boolean = false;
  isCustom = false;
  IsNavOpen = false;
  IsSearchOpen = true;
  isLogged: boolean;
  placesAdv = [];
  subscription: Subscription;
  // tslint:disable-next-line:typedef
  advPlace: any;
  componentAdded(e: any){
    e.isCustom ? this.isCustom = true : this.isCustom = false ;
  }
  // tslint:disable-next-line:variable-name
  constructor( private _authentication: AuthenticationService, private _router: Router, private _place: PlaceService) {
  }
  ngOnInit(): void {
    this.subscription = this._authentication.status.subscribe(e => this.isLogged = e);
    this._place.getAdv().subscribe((res: any) => {
      this.placesAdv = res.ads;
    }, (err) => {
      this.isAdvertise = false;
      clearInterval(adv);
    });
    const adv = setInterval(() => {
      this.advPlace = this.placesAdv[Math.floor(Math.random() * this.placesAdv.length)];
      this.isAdvertise = !this.isAdvertise;
    }, 30000);
  }
  closeAdv(){
    this.isAdvertise = false;
  }
  // tslint:disable-next-line:typedef
  OpenNav() {
    this.IsNavOpen = !this.IsNavOpen;
  }
  // tslint:disable-next-line:typedef
  StartSearch(e: any) {
    this.IsSearchOpen = !this.IsSearchOpen;
    setTimeout(() => {
      e.focus();
    }, 300);
  }
  // tslint:disable-next-line:typedef
  loseFocusNav(){
    setTimeout(() => {
      this.IsSearchOpen = true;
    }, 300);
  }
  // tslint:disable-next-line:typedef
  logout(){
    this._authentication.logout();
    this._router.navigateByUrl('/');
  }
  titleSearch(title: any){
    this._place.getPlaceByTitle(title.value).subscribe((res: any) => {
        this._router.navigateByUrl(`trip/details/${res.id}`);
        title.value = '';
    }, (err) => {
      this._router.navigateByUrl(`trip/details/404`);
      title.value = '';
    });
  }
}
