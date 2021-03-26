import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { PlaceService } from 'src/app/services/place.service';
import { User } from '../../../models/user';
import { FavoriteService } from '../../../services/favorite.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CategoryService } from '../../../services/category.service';


@Component({
  selector: 'app-host-profile',
  templateUrl: './host-profile.component.html',
  styleUrls: ['./host-profile.component.scss']
})

export class HostProfileComponent implements OnInit {
  @ViewChild('fileInput', {static: false} ) fileInput: ElementRef;

  lat: any;
  lng: any;
   file = new FormData();
   files: any [] = [];
  form: FormGroup;
  editForm: FormGroup;
  location = null;
  category: any = null;
  categories: any[];
  tag = null;
  places: any = [];
  erro: string;
  cito = null;
  user: User;
  index = 1;
  isEdit = false;
  placeID: string;
  listOfFiles: any[] = [];
  dis = true;
  cities = ['Cairo', 'Alexandria', 'Gizeh', 'Port Said', 'Suez', 'Luxor', 'al-Mansura', 'El-Mahalla El-Kubra', 'Tanta', 'Asyut', 'Ismailia', 'Fayyum', 'Zagazig', 'Aswan', 'Damietta', 'Damanhur', 'al-Minya', 'Beni Suef', 'Qena', 'Sohag', 'Hurghada', '6th of October City', 'Shibin El Kom', 'Banha', 'Kafr el-Sheikh', 'Arish', '10th of Ramadan City', 'Bilbais', 'Marsa Matruh' , 'Idfu'];
  iseditable = false;
  loc = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&q=Egypt+madinty';
  type = null;
  constructor(
    private _authentication: AuthenticationService,
    private _api: ApiService,
    private _placeService: PlaceService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _favoriteService: FavoriteService, private categoryService: CategoryService) { }
  ngOnInit(): void {
    this._api.getWithToken('/user').subscribe((resp) => {
      // @ts-ignore
      this.user = resp.profile;
      this._api.get('category/list').subscribe((res: any) => {
        this.categories = res.data;
      });
    });
    this._placeService.getUserPlaces().subscribe((res: any) => {
      this.places = res.places;
    }, (error) => {
    });
    this.form = this._formBuilder.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50)
        ],
      ],
      category: [
        '',
      ],
      tag: [
        '',
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(200)
        ],
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(11),
        ],
      ],
      type: [
        '',
        [
          Validators.required,
        ],
      ],
      image: [
        Array,
        [
          Validators.required,
        ],
      ],
    });


    this.editForm = this._formBuilder.group({

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

    this._api.getWithToken('/user').subscribe((resp: any) => {
      this.user = resp.profile;
    });
    this.editForm.disable();
    this.getLocation();
  }
  tabChanger(index: number) {
    this.index = index;
  }
  deletePlace(id: string){
    this._placeService.delete(id).subscribe((res) => {
      this.ngOnInit();
    }, (error) => {
    });

  }

  onOptionsSelected(){
    if (this.category !== null){
      this.dis = false;
      this.form.controls.tag.enable();
      const found: any = this.categories.find((element: any) => element.title === this.category);
      this.categoryService.getAllTags(found._id).subscribe((res: any) => {
        this.tag = res.tags;
      }, () => {
      });
    }
  }
  OnSubmit() {
    this.getLocation();
    const filee = this.fileInput.nativeElement.files;
    for (const filo of filee ) {
     this.listOfFiles.push(filo);
    }
    this.file.append('title', this.form.controls.title.value);
    this.file.append('category', this.form.controls.category.value);
    this.file.append('tag', this.form.controls.tag.value);
    this.file.append('description', this.form.controls.description.value);
    this.file.append('phone', this.form.controls.phone.value);
    this.file.append('type', this.form.controls.type.value);
    if (this.lat !== undefined && this.lng !== undefined)
     {
      this.file.append('location', this.lng);
      this.file.append('location', this.lat);
     }

    console.log(this.file);
    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < this.fileInput.nativeElement.files.length; index++) {
      this.file.append('images', this.fileInput.nativeElement.files[index]);
  }
    if (!this.isEdit){
      this._placeService.create(this.file).subscribe((response: any) => {
        console.log(response);
        this.listOfFiles = [];
        if (response.success){
          this.ngOnInit();
          this.index = 3;
        }
      }, ((error) => {
        // this.erro = 'this username or email already exist';
        console.log(error);
      }));
    }else {
      this._placeService.update(this.file, this.placeID).subscribe((response) => {
        this._router.navigateByUrl(`trip/details/${this.placeID}`);
      }, (() => {
      }));
    }
  }
  editPlace(place: any){
    this.index = 2;
    this.isEdit = true;
    this.placeID = place._id;
    this.form.patchValue({
      title: place.title ,
      description: place.description,
      phone: place.phone,
      type: place.type,
      location: place.location,
    });
  }
  OnEdit(){
    this.editForm.enable();
    this.iseditable = !this.iseditable;
    const user = {
      firstname: this.editForm.controls.firstname.value,
      lastname: this.editForm.controls.lastname.value,
      city: this.editForm.controls.cito.value,
      email: this.editForm.controls.Email.value,
    };
    setTimeout(() => this._authentication.editProfile(user).subscribe((response) => {
      this.editForm.disable();
    }, (() => {
    })), 4000);
  }
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        if (position) {
          console.log('Latitude: ' + position.coords.latitude +
            '  Longitude: ' + position.coords.longitude);
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
        }
      },
        (error: PositionError) => console.log(error));
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }
}





