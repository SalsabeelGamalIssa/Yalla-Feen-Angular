import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingComponent } from './rating/rating.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { LoadingComponent } from './loading/loading.component';
import {NgxSpinnerModule} from 'ngx-spinner';

@NgModule({
  declarations: [RatingComponent, FavoriteComponent, LoadingComponent],
  imports: [
    CommonModule,
    NgxSpinnerModule
  ],
    exports: [RatingComponent, FavoriteComponent, LoadingComponent]
})
export class SharedModule { }
