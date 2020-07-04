import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate, CanLoad, CanActivateChild {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  /**
   * Redireciona para o login se não estiver logado
   */
  private verifyAccess(placeSlug?: string) {
    if (this.authService.isLoggedIn()) {
      return true;
    }

    this.router.navigate([`/login`]);
    return false;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | boolean {
    return this.verifyAccess(state.url.split('/')[1]);
  }

  canLoad(route: Route): boolean {
    return this.verifyAccess();
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.verifyAccess(state.url.split('/')[1]);
  }
}
