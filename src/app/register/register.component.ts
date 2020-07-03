import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';
import { User } from '../users/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formUserRegister: FormGroup;
  showUploaded = false;
  erro: HttpErrorResponse;

  constructor(private http: HttpClient,
              private router: Router) { }

  ngOnInit(): void {
    this.createRegisterForm(new User());
  }

  createRegisterForm(user: User){
    this.formUserRegister = new FormGroup({
      nome: new FormControl(user.nome),
      email: new FormControl(user.email),
      password: new FormControl(user.password),
      repassword: new FormControl(user.password),
      userImg: new FormControl('https://www.pngkit.com/png/detail/796-7963534_individuals-person-icon-circle-png.png'),
      cell: new FormControl(user.cell),
      aboutMe: new FormControl(user.aboutMe)
    });
  }

  onSubmitRegister() {
    this.showUploaded = false;
    this.erro = null;

    if (this.formUserRegister.controls.password.value === this.formUserRegister.controls.repassword.value) {
      this.register( this.formUserRegister.controls.nome.value,
                  this.formUserRegister.controls.email.value,
                  this.formUserRegister.controls.password.value,
                  this.formUserRegister.controls.userImg.value,
                  this.formUserRegister.controls.cell.value,
                  this.formUserRegister.controls.aboutMe.value).subscribe();
    }
  }

  register(nome: string, email: string, password: string, userImg: string, cell: string, aboutMe: string): Observable<any> {
    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('userImg', userImg);
    formData.append('cell', cell);
    formData.append('aboutMe', aboutMe);

    console.warn(this.formUserRegister.value); // pode apertar enter para submeter
    return this.http.post<any>('http://52.67.36.1/add_user', formData)
      .pipe(
        catchError((err) => {
          this.erro = err;
          return throwError(err);
        }),
        tap(response => {
          this.router.navigate(['']),
          console.log('response -> ', response);
        })
      );
  }

  fotoEnviada(event: any) {
    this.formUserRegister.controls.userImg.setValue(event.url);
    this.showUploaded = true;
  }
}
