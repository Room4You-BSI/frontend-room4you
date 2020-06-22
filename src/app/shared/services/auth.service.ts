import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_KEY = 'token';
  private token: string;

  constructor(
    private http: HttpClient,
  ) {
    this.token = localStorage.getItem(this.TOKEN_KEY);
  }

  login(email: string, password: string): Observable<any> {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    return this.http.post<any>(`${environment.backendBaseUrl}get_profile`, formData).pipe(
      tap(res => {
        localStorage.setItem(this.TOKEN_KEY, res.jwt);
      }),
    );
  }

  getToken() {
    return this.token;
  }
}
