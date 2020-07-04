import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { tap } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';


enum CustomBreakpoints {
  SM_DOWN = '(max-width: 575.99px)',
  SM_ONLY = '(min-width: 576px) and (max-width: 767.99px)',
  SM_UP   = '(min-width: 768px)',

  MD_DOWN = '(max-width: 767.99px)',
  MD_ONLY = '(min-width: 768px) and (max-width: 991.99px)',
  MD_UP   = '(min-width: 992px)',

  LG_DOWN = '(max-width: 991.99px)',
  LG_ONLY = '(min-width: 992px) and (max-width: 1199.99px)',
  LG_UP   = '(min-width: 1200px)',

  XL_DOWN   = '(max-width: 1199.99px)',
}


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  downMdSize: boolean;
  onlyMdSize: boolean;
  erro: HttpErrorResponse;
  text: string;

  showDropdown = false;

  logged = false;
  userImage = '';
  userName = '';

  menuItems = [
    {text: 'Anuncie', link: '/advertise', hiddeIfLogged: false},
    {text: 'Sobre', link: '/about', hiddeIfLogged: false},
    {text: 'Login', link: '/login', hiddeIfLogged: true},
    {text: 'Cadastre', link: '/register', hiddeIfLogged: true},
  ];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.breakpointObserver.observe([
      CustomBreakpoints.MD_DOWN,
      CustomBreakpoints.MD_ONLY,
    ]).pipe(tap(result => {
      this.downMdSize = result.breakpoints[CustomBreakpoints.MD_DOWN];
      this.onlyMdSize = result.breakpoints[CustomBreakpoints.MD_ONLY];
      if (this.downMdSize) {
        this.showDropdown = false;
      }
    })).subscribe();

    this.authService.loginObservable().pipe(tap(response => {
      this.logged = response;
      this.showDropdown = false;
      if (response) {
        this.userImage = this.authService.getImage();
        this.userName = this.authService.getName();
      }
    })).subscribe();
  }

  logout() {
    this.authService.logout();
  }
}
