import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { tap } from 'rxjs/operators';

import { AuthService } from '../shared/services/auth.service';
import { User } from '../users/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formUserLogin: FormGroup;

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
    console.warn(this.formUserLogin.value); // pode apertar enter para submeter
    this.authService.login(this.formUserLogin.controls.email.value, this.formUserLogin.controls.password.value).pipe(
      tap(() => this.router.navigate([''])),
    ).subscribe();
  }
}
