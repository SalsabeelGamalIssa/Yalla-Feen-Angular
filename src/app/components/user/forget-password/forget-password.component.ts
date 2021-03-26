import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  FormMail: FormGroup;
  FormCode: FormGroup;
  isSubmit: boolean = false;
  Email: string;
  token: string;
  constructor(private _formBuilder: FormBuilder, private _authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.FormMail = this._formBuilder.group({
      Email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
          Validators.minLength(5),
          Validators.maxLength(30),
        ],
      ],
    });
    this.FormCode = this._formBuilder.group({
      code: [
        '',
        [
          Validators.required,
          Validators.maxLength(6),
          Validators.minLength(6),
        ],
      ],
    });
  }
  // tslint:disable-next-line:typedef
  SubmitEmail(e: string){
    switch (e) {
      case 'submit':
        this._authService.forgetpassword(this.Email).subscribe((res) => {
          console.log(res);
        }, (error) => {
        });
        this.isSubmit = true;
      break;
      case 'verify':
        console.log(this.token + this.Email);
        this._authService.check_token(this.Email,this.token).subscribe((res) => {
          this.router.navigate(['/user/reset-password',{"email":this.Email,"reset-token":this.token}]);
        }, (error) => {
          this.router.navigate(['/user/reset-password',{"email":this.Email,"reset-token":this.token}]);
        });
        this.isSubmit = true;
        break;
    }
  }
}
