import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isLogged: boolean;
  constructor(private _authentication: AuthenticationService, private _router: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    this._authentication.status.subscribe(e => this.isLogged = e);
    if (this.isLogged) {
      this._router.navigateByUrl('/');
      return false;
    } else {
      return true;
    }
  }
}
