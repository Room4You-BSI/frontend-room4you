import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';
import { User } from '../users/user';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formUserLogin: FormGroup;

  constructor(private http: HttpClient) { }

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
    this.login(this.formUserLogin.controls.email.value, this.formUserLogin.controls.password.value).subscribe();
  }

  login(email: string, password: string): Observable<any> {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    console.warn(this.formUserLogin.value); // pode apertar enter para submeter
    return this.http.post<any>('http://52.67.36.1/get_profile', formData).pipe(
      tap(response => {
        console.log('response -> ', response);
      })
    );
  }
}
