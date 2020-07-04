import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '@environment';
import { CreateOfferModel } from '@shared/models';


@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(
    private http: HttpClient,
  ) {}

  getOffers(): Observable<any> {
    return this.http.get(`${environment.backendBaseUrl}posts`); // TODO: adicionar post_id
  }

  createOffer(body: CreateOfferModel): Observable<any> {
    return this.http.post(`${environment.backendBaseUrl}create_post`, body);
  }

  addToFavorite(postId: number): Observable<any> {
    return this.http.post(`${environment.backendBaseUrl}add_as_favorite`, {post_id: postId});
  }

  removeFavorite(postId: number): Observable<any> {
    return this.http.post(`${environment.backendBaseUrl}remove_favorite`, {post_id: postId});
  }

  author(postId: number): Observable<any> {
    return this.http.post(`${environment.backendBaseUrl}post_author`, {post_id: postId});
  }
}
