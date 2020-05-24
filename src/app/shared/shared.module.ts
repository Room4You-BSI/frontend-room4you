import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { OfferCardComponent } from './offer-card/offer-card.component';


const matModules = [
  MatToolbarModule,
  MatMenuModule,
  MatListModule,
  MatButtonModule,
  MatIconModule,
  MatGridListModule,
  LayoutModule,
  MatCardModule,
];


@NgModule({
  declarations: [
    HeaderComponent,
    OfferCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,

    ...matModules,
  ],
  exports: [
    RouterModule,
    CommonModule,

    HeaderComponent,
    OfferCardComponent,

    ...matModules,
  ],
})
export class SharedModule { }
