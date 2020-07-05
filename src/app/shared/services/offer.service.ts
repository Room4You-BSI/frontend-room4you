import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '@environment';
import { CreateOfferModel, OfferDetailsModel } from '@shared/models';


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

  getMyPosts(): Observable<any> {
    return this.http.get(`${environment.backendBaseUrl}my_posts_list`);
  }

  getMyFavorites(): Observable<any> {
    return this.http.get(`${environment.backendBaseUrl}favorite_list`);
  }

  createOffer(body: CreateOfferModel): Observable<any> {
    return this.http.post(`${environment.backendBaseUrl}create_post`, body);
  }

  offerDetails(id: any): Observable<OfferDetailsModel> {
    return this.http.get<OfferDetailsModel>(`${environment.backendBaseUrl}posts/${id}`);
  }

  addToFavorite(postId: number): Observable<any> {
    return this.http.post(`${environment.backendBaseUrl}add_as_favorite`, {post_id: postId});
  }

  removeFavorite(postId: number): Observable<any> {
    return this.http.post(`${environment.backendBaseUrl}remove_favorite`, {post_id: postId});
  }

  getAuthor(postId: number): Observable<any> {
    return this.http.get(`${environment.backendBaseUrl}post_author/${postId}`);
  }
}
