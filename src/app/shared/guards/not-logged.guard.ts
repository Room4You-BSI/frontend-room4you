import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class NotLoggedGuard implements CanActivate, CanLoad, CanActivateChild {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  /**
   * Redireciona para a home se já estiver logado
   */
  private verifyAccess() {
    if (!this.authService.isLoggedIn()) {
      return true;
    }
    this.router.navigate([`/home`]);
    return false;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | boolean {
    return this.verifyAccess();
  }

  canLoad(route: Route): boolean {
    return this.verifyAccess();
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.verifyAccess();
  }
}
