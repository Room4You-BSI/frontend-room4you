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
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { AgmCoreModule } from '@agm/core';

import { environment } from '@environment';

import { BottomFilterComponent } from './components/bottom-filter/bottom-filter.component';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { HeaderComponent } from './components/header/header.component';
import { LightsliderComponent } from './components/lightslider/lightslider.component';
import { MapComponent } from './components/map/map.component';
import { OfferCardComponent } from './components/offer-card/offer-card.component';
import { OwnerCardComponent } from './components/owner-card/owner-card.component';


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
  MatProgressSpinnerModule,
  MatStepperModule,
  MatRadioModule,
  MatProgressBarModule,
];


@NgModule({
  declarations: [
    HeaderComponent,
    OfferCardComponent,
    BottomFilterComponent,
    LightsliderComponent,
    MapComponent,
    OwnerCardComponent,
    FileUploaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsKey,
      libraries: ['places'],
    }),

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
    MapComponent,
    OwnerCardComponent,
    FileUploaderComponent,

    AgmCoreModule,
    ...matModules,
  ],
})
export class SharedModule {}
