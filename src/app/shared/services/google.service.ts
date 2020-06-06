import { Injectable, NgZone } from '@angular/core';

import { MapsAPILoader } from '@agm/core';
import { Observable } from 'rxjs';


interface GeocodeData {
  address: string;
  lat: number;
  lng: number;
}

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
  ) {}

  geocode(address: string): Observable<GeocodeData> {
    return new Observable<GeocodeData>((observer) => {
      this.ngZone.run(() => {
        this.mapsAPILoader.load().then(() => {
          const geocoder = new google.maps.Geocoder();

          geocoder.geocode({ address }, (results, responseStatus) => {

            if (responseStatus.toString() === 'OK') {
              const geoCodeData: GeocodeData = {
                address: results[0].formatted_address,
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng(),
              };
              observer.next(geoCodeData);
            } else {
              observer.error(responseStatus);
            }
          });

          return {
            unsubscribe() {},
          };
        });
      });
    });
  }
}
