import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

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

  @ViewChild('userDropDown', {static: false}) userDropDownRef: ElementRef;
  @ViewChild('userInfo', {static: false}) userInfoRef: ElementRef;
  @ViewChild('userInfoMobile', {static: false}) userInfoMobileRef: ElementRef;
  dropDownLeftOffset = 0;
  dropDownTopOffset = 0;

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

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.logged) {
      if (this.downMdSize) {
        if (!this.userDropDownRef.nativeElement.contains(event.target)
          && !this.userInfoMobileRef.nativeElement.contains(event.target)) {
          this.showDropdown = false;
        }
      } else {
        if (!this.userDropDownRef.nativeElement.contains(event.target)
          && !this.userInfoRef.nativeElement.contains(event.target)) {
          this.showDropdown = false;
        }
      }
    }
  }

  @HostListener('window:scroll', ['$event'])
  scrollHandler(event) {
    if (this.logged) {
      this.showDropdown = false;
    }
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.breakpointObserver.observe([
      CustomBreakpoints.MD_DOWN,
      CustomBreakpoints.MD_ONLY,
    ]).pipe(tap(result => {
      this.showDropdown = false;
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

  toggleDropDown() {
    if (!this.showDropdown) {
      if (this.downMdSize) {
        const offsets = this.userInfoMobileRef.nativeElement.getBoundingClientRect();
        this.dropDownLeftOffset = Math.round(offsets.x) - 100;
        this.dropDownTopOffset = window.scrollY + 64;
      } else {
        const offsets = this.userInfoRef.nativeElement.getBoundingClientRect();
        this.dropDownLeftOffset = Math.round(offsets.x);
        this.dropDownTopOffset = window.scrollY + 64;
      }
    }
    this.showDropdown = !this.showDropdown;
  }
}
