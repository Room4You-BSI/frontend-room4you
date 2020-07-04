import { Injectable } from '@angular/core';

import * as jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class JwtService {

  public decodePayloadJWT(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}
