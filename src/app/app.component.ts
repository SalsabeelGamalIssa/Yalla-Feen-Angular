import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoaded = true;
  title = 'yallafeen';
  // tslint:disable-next-line:typedef
  ngOnInit(){
    setTimeout(() => {
      this.isLoaded = false;
    }, 2000);
  }
}
