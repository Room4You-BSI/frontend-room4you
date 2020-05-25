import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
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
  MatSelectModule,
  MatInputModule,
  MatCheckboxModule,
];


@NgModule({
  declarations: [
    HeaderComponent,
    OfferCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,

    ...matModules,
  ],
  exports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,

    HeaderComponent,
    OfferCardComponent,

    ...matModules,
  ],
})
export class SharedModule { }
