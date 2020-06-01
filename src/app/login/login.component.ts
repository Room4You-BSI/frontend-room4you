import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';
import { User } from '../users/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formUserLogin: FormGroup;

  constructor() { }

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
    console.log(this.formUserLogin.value);
  }
}
