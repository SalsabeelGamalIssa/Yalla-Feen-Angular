import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../services/authentication.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  form: FormGroup;
  cito = null;
  confirm: boolean = false;
  // tslint:disable-next-line:max-line-length
  cities = ['Alexandria', 'Gizeh', 'Port Said', 'Suez', 'Luxor', 'al-Mansura', 'El-Mahalla El-Kubra', 'Tanta', 'Asyut', 'Ismailia', 'Fayyum', 'Zagazig', 'Aswan', 'Damietta', 'Damanhur', 'al-Minya', 'Beni Suef', 'Qena', 'Sohag', 'Hurghada', '6th of October City', 'Shibin El Kom', 'Banha', 'Kafr el-Sheikh', 'Arish', '10th of Ramadan City', 'Bilbais', 'Marsa Matruh' , 'Idfu'];
  constructor(private _formBuilder: FormBuilder, private _authentication: AuthenticationService, private _router: Router) { }
  erro :string;

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      Username: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
        ],
      ],
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
      Password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(18),
        ],
      ],
      confirmpassword: [ '',
        [
          Validators.required,
        ]
      ]
    });
  }
  checkPasswords() { // here we have the 'passwords' group
    // @ts-ignore
    const password = this.form.controls.Password.value;
    // @ts-ignore
    const confirmPassword =  this.form.controls.confirmpassword.value;
    password === confirmPassword ? this.confirm = true : this.confirm = false;
  }
  OnSubmit(){
    const user = {
      username: this.form.controls.Username.value,
      firstname: this.form.controls.firstname.value,
      lastname: this.form.controls.lastname.value,
      city: this.form.controls.cito.value,
      email: this.form.controls.Email.value,
      password: this.form.controls.Password.value,
      confirmPassword: this.form.controls.confirmpassword.value
    };
    this._authentication.signup(user).subscribe((response: any) => {
      console.log(response);
      !response.errors ?  this._router.navigateByUrl('/user/login') : this.erro = 'this username or email already exist';
    }, ((e) => {
      this.erro = 'this username or email already exist';
    }));
  }
}
