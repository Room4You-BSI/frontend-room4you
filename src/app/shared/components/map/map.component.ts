/// <reference types='@types/googlemaps' />

import { Component, Input, OnInit } from '@angular/core';

import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { GoogleService } from '@shared/services/google.service';

import { mapThemes } from './map-themes';


interface MapIcon {
  url: string;
  scaledSize: {
    width: number;
    height: number;
  };
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  // Texto apresentado quando usuário clica no marcador do mapa
  @Input() textInfo: string;

  // Endereço do quarto a ser alugado
  @Input() address: string;

  // cordenadas do quarto a ser alugado (setado na resposta do serviço do google)
  lat: number;
  lng: number;
  zoom = 15;

  // usado para controlar a abertura e fechamento da caixa de informação
  openMessage = false;
  serviceError = false;

  // icone para marcador personalizado
  mapIcon: MapIcon = {
    url: 'assets/icons/map-marker.svg',
    scaledSize: {
      width: 40,
      height: 40,
    }
  };

  // estilo personalizado para o mapa
  darkStyle = mapThemes.dark;

  constructor(
    private googleService: GoogleService,
  ) {}

  ngOnInit() {
    if (this.address) {
      // se o endereço for setado faz a busca no google
      this.googleService.geocode(this.address).pipe(
        tap(response => {
          this.lat = response.lat;
          this.lng = response.lng;
        }),
        catchError(() => {
          this.serviceError = true;
          return of(null);
        })
      ).subscribe();
    }
  }
}
