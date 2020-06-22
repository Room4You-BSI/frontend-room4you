import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '@environment';


@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(
    private http: HttpClient,
  ) {}

  getOffers(): Observable<any> {
    return this.http.get(`${environment.backendBaseUrl}posts`);
  }
}
