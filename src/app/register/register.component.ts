import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment.dev';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../users/user';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formUserRegister: FormGroup;
  showUploaded = false;
  erro: HttpErrorResponse;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.createRegisterForm(new User());
  }

  createRegisterForm(user: User){
    this.formUserRegister = new FormGroup({
      nome: new FormControl(user.nome),
      email: new FormControl(user.email),
      contactEmail: new FormControl(user.contactEmail),
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
                  this.formUserRegister.controls.contactEmail.value,
                  this.formUserRegister.controls.password.value,
                  this.formUserRegister.controls.userImg.value,
                  this.formUserRegister.controls.cell.value,
                  this.formUserRegister.controls.aboutMe.value).subscribe();
    }
  }

  register(nome: string, email: string, contactEmail: string,
           password: string, userImg: string, cell: string, aboutMe: string): Observable<any> {
    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('email', email);
    formData.append('contactEmail', contactEmail);
    formData.append('password', password);
    formData.append('userImg', userImg);
    formData.append('cell', cell);
    formData.append('aboutMe', aboutMe);

    console.warn(this.formUserRegister.value); // pode apertar enter para submeter
    return this.http.post<any>(environment.backendBaseUrl + 'add_user', formData)
      .pipe(
        catchError((err) => {
          this.erro = err;
          return throwError(err);
        }),
        tap(response => {
          this.router.navigate(['/home']),
          this.authService.setLoginData(response.jwt);
        })
      );
  }

  fotoEnviada(event: any) {
    this.formUserRegister.controls.userImg.setValue(event.url);
    this.showUploaded = true;
  }
}
