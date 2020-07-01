import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { tap, catchError } from 'rxjs/operators';

import { AuthService } from '../shared/services/auth.service';
import { User } from '../users/user';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formUserLogin: FormGroup;
  erro: HttpErrorResponse;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.createLoginForm(new User());
  }

  createLoginForm(user: User){
    this.formUserLogin = new FormGroup({
      email: new FormControl(user.email),
      password: new FormControl(user.password)
    });
  }

  onSubmitLogin() {
    this.erro = null;
    console.warn(this.formUserLogin.value); // pode apertar enter para submeter
    this.authService.login(this.formUserLogin.controls.email.value, this.formUserLogin.controls.password.value).pipe(
      tap(() => this.router.navigate([''])),
      catchError((err) => {
        this.erro = err;
        return throwError(err);
      })
    ).subscribe();
  }
}
