import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

import { tap, catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';


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

  menuItems = [
    {text: 'Anuncie', link: '/advertise'},
    {text: 'Sobre', link: '/about'},
    {text: 'Login', link: '/login'},
    {text: 'Cadastre', link: '/register'},
  ];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.breakpointObserver.observe([
      CustomBreakpoints.MD_DOWN,
      CustomBreakpoints.MD_ONLY,
    ]).pipe(tap(result => {
      this.downMdSize = result.breakpoints[CustomBreakpoints.MD_DOWN];
      this.onlyMdSize = result.breakpoints[CustomBreakpoints.MD_ONLY];
    })).subscribe();
  }
}
