import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { CepModel } from '../models/cep.model';


@Injectable({
  providedIn: 'root'
})
export class CepService {

  constructor(
    private http: HttpClient,
  ) {}

  searchCep(cep: string): Observable<CepModel> {
    return this.http.get<CepModel>('http://viacep.com.br/ws/' + cep + '/json/');
  }
}
