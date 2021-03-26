import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import {RouterModule, Routes} from '@angular/router';
import { FAQsComponent } from './faqs/faqs.component';

const routes: Routes = [
  {path: 'about-us', component: AboutUsComponent},
  {path: 'contact-us', component: ContactUsComponent},
  {path: 'FAQs', component: FAQsComponent},
];

@NgModule({
  declarations: [AboutUsComponent, ContactUsComponent, FAQsComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes),
  ]
})
export class InfoModule { }
