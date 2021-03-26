import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { Routes, RouterModule } from '@angular/router';
import { TopRatedComponent } from './top-rated/top-rated.component';
import { CustomComponent } from './custom/custom.component';
import {FormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import { CustomizedTripsComponent } from './customized-trips/customized-trips.component';
import { DetailsComponent } from './details/details.component';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {SharedModule} from '../../shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerModule } from 'ngx-spinner';
const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'custom', component: CustomComponent},
  {path: 'top-rated', component: TopRatedComponent},
  {path: 'place/search', component: CustomizedTripsComponent},
  {path: 'trip/details/:id', component: DetailsComponent},
];
@NgModule({
  declarations: [IndexComponent, TopRatedComponent, CustomComponent, CustomizedTripsComponent, DetailsComponent],
  imports: [InfiniteScrollModule,
    NgxSpinnerModule,
    CommonModule,
    RouterModule.forChild(routes),
    NgSelectModule, FormsModule,
    MatSelectModule,
    MatInputModule,
    SharedModule
  ]
})
export class TripModule { }
