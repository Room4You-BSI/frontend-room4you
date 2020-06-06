import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { BottomFilterComponent } from './components/bottom-filter/bottom-filter.component';
import { HeaderComponent } from './components/header/header.component';
import { OfferCardComponent } from './components/offer-card/offer-card.component';
import { LightsliderComponent } from './lightslider/lightslider.component';


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
  MatExpansionModule,
];


@NgModule({
  declarations: [
    HeaderComponent,
    OfferCardComponent,
    BottomFilterComponent,
    LightsliderComponent,
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
    BottomFilterComponent,
    LightsliderComponent,

    ...matModules,
  ],
})
export class SharedModule { }
