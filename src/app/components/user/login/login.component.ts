import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthenticationService} from '../../../services/authentication.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;


  constructor(private _formBuilder: FormBuilder, private _authentication: AuthenticationService, private _router: Router) {}
erro :string;
  ngOnInit(): void {

    this.form = this._formBuilder.group({
      Email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
          Validators.minLength(5),
          Validators.maxLength(30),
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
    });
  }

  OnSubmit(){
    const user  = {
      email: this.form.controls.Email.value,
      password: this.form.controls.Password.value
    };
    this._authentication.login(user).subscribe((response:any) => {
      localStorage.setItem('token', response.token);
      this._authentication.changeStatus(true);
      this._router.navigateByUrl('/');
    }, (() => {
      this.erro = 'invalid username or password';
    }));
  }
}
