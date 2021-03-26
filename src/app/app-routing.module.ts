import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LayoutComponent} from './components/layout/layout.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    loadChildren: () => import('./components/trip/place.module').then(m => m.TripModule)
  },
  {
    path: 'user', component: LayoutComponent,
    loadChildren: () => import('../app/components/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'info', component: LayoutComponent,
    loadChildren: () => import('../app/components/info/info.module').then(m => m.InfoModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
