import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { JwtService } from './jwt.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_KEY = 'token';
  private token: string;
  private decodedToken: any;

  private loginSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    private jwtService: JwtService,
    private router: Router,
  ) {
    this.token = localStorage.getItem(this.TOKEN_KEY);
    if (this.token) {
      this.loginSubject.next(true);
    }
  }

  login(email: string, password: string): Observable<any> {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    return this.http.post<any>(`${environment.backendBaseUrl}get_profile`, formData).pipe(
      tap(res => {
        localStorage.setItem(this.TOKEN_KEY, res.jwt);
        this.token = res.jwt;
        this.loginSubject.next(true);
      }),
    );
  }

  logout() {
    sessionStorage.removeItem(this.TOKEN_KEY);
    this.token = null;
    this.router.navigate(['/home']);
    this.loginSubject.next(false);
  }

  loginObservable(): Observable<boolean> {
    return this.loginSubject.asObservable();
  }

  isLoggedIn() {
    return !!this.token && this.checkExp();
  }

  getToken() {
    if (!this.token || !this.checkExp()) { return null; }
    return this.token;
  }

  getName() {
    return this.getDecodedToken().name;
  }

  getImage() {
    return this.getDecodedToken().img;
  }

  private getDecodedToken() {
    if (!this.decodedToken) {
      this.decodedToken = this.jwtService.decodePayloadJWT(this.token);
    }
    return this.decodedToken;
  }

  private checkExp() {
    return ((new Date()).getTime() / 1000) < this.getDecodedToken().exp;
  }
}
