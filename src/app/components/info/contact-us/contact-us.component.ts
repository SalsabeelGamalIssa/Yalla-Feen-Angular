import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../services/api.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
   message: {} = {};
 invalid: boolean;

  constructor(private apiService: ApiService) {
  }


  ngOnInit(): void {
  }


// tslint:disable-next-line:typedef
  formMsg(name: any, email: any, msg: any, e: any) {
    if (name.value && email.value && msg.value) {
      this.invalid = false;
      this.message = {
        name: name.value,
        email: email.value,
        msg: msg.value
      };
      console.log(this.message);
      this.apiService.post('message/create', this.message).subscribe((res) => {
        console.log(res);

      }, ((err) => {
        console.log(err);
        this.invalid = true;
      }));

    } else {
      this.invalid = true;
    }
    e.preventDefault();
  }
}
