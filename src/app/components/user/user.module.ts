import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProfileComponent } from './profile/profile.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HostProfileComponent } from './host-profile/host-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import {AuthGuard} from '../../guards/auth.guard';
import {ProfileGuard} from '../../guards/profile.guard';
const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'sign-up', component: SignUpComponent, canActivate: [AuthGuard] },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [ProfileGuard]},
  { path: 'host-profile', component: HostProfileComponent, canActivate: [ProfileGuard] },
  { path: 'forget-password', component: ForgetPasswordComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    ProfileComponent,
    ResetPasswordComponent,
    HostProfileComponent,
    ForgetPasswordComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgSelectModule,
    NgbCarouselModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class UserModule {}
