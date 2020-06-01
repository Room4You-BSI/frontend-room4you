import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';
import { User } from '../users/user';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formUserRegister: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.createRegisterForm(new User());
  }

  createRegisterForm(user: User){
    this.formUserRegister = new FormGroup({
      nome: new FormControl(user.nome),
      email: new FormControl(user.email),
      password: new FormControl(user.password),
      repassword: new FormControl(null)
    });
  }

  onSubmitRegister() {
    console.log(this.formUserRegister.value);
  }
}
