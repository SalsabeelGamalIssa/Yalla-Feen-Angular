import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ApiService} from 'src/app/services/api.service';
import {AuthenticationService} from 'src/app/services/authentication.service';
import {PlaceService} from 'src/app/services/place.service';
import {User} from '../../../models/user';
import {FavoriteService} from '../../../services/favorite.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  selectedFile: File;
  filo = new FormData();
  cito = null;
  form: FormGroup;
  favorites: any = [];
  places: any = [];
  profilePicture: any;
  erro: string;
  user: User;
  index = 1;
  iseditable: boolean = false;
  avatarChanged: boolean = false;
  cities = ['Cairo', 'Alexandria', 'Gizeh', 'Port Said', 'Suez', 'Luxor', 'al-Mansura', 'El-Mahalla El-Kubra', 'Tanta', 'Asyut', 'Ismailia', 'Fayyum', 'Zagazig', 'Aswan', 'Damietta', 'Damanhur', 'al-Minya', 'Beni Suef', 'Qena', 'Sohag', 'Hurghada', '6th of October City', 'Shibin El Kom', 'Banha', 'Kafr el-Sheikh', 'Arish', '10th of Ramadan City', 'Bilbais', 'Marsa Matruh', 'Idfu'];
  loc = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&q=Egypt+giza';
  constructor(private _api: ApiService,
              private _placeService: PlaceService,
              private _favoriteService: FavoriteService,
              private _formBuilder: FormBuilder,
              private _authentication: AuthenticationService) {
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      cito: [
        '',
      ],
      firstname: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
        ],
      ],
      lastname: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
        ],
      ],
      Email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
          ,
          Validators.minLength(5),
        ],
      ],
    });
    this.form.disable();
    this._api.getWithToken('/user').subscribe((resp: any) => {
      this.user = resp.profile;
    });
    this._placeService.getUserPlaces().subscribe((res: any) => {
      this.places = res.data;
      console.log(this.places);
    }, () => {
    });
    this._favoriteService.getUserFavorites().subscribe(((res: any) => {
      this.favorites = res.favorites_places;
    }), () => {
    });
  }

  tabChanger(index: number) {
    this.index = index;
  }

  deleteFavorite(id: string) {
    this._favoriteService.deletewithToken(id).subscribe((res) => {
      this.ngOnInit();
    }, () => {
    });
  }

  OnSubmit() {
    this.form.enable();
    this.iseditable = !this.iseditable;
    const user = {
      firstname: this.form.controls.firstname.value,
      lastname: this.form.controls.lastname.value,
      city: this.form.controls.cito.value,
      email: this.form.controls.Email.value,

    };
    console.log(user);
    setTimeout(() =>
      this._authentication.editProfile(user).subscribe((response) => {
      }, (() => {
      })), 4000);
  }

  onUpload(event: any) {
    this.selectedFile = event.target.files[0];
    this.filo.append('avatar', this.selectedFile);
    this._authentication.change_Profilepicture(this.filo).subscribe((res) => {
      this.avatarChanged = true;
      setTimeout(() => {
        this.avatarChanged = false;
      }, 3500);
      this._api.getWithToken('/user').subscribe((resp: any) => {
        this.user = resp.profile;
      });
    }, () => {
    });
  }
}





