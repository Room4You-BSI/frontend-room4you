import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AboutComponent } from './about/about.component';
import { AdvertiseComponent } from './advertise/advertise.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { interceptors } from './interceptors';
import { LoginComponent } from './login/login.component';
import { OfferDetailsComponent } from './offer-list/offer-details/offer-details.component';
import { OfferListComponent } from './offer-list/offer-list.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from './shared/shared.module';
import { TermsAndPolicyComponent } from './terms-and-policy/terms-and-policy.component';


registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    AdvertiseComponent,
    LoginComponent,
    RegisterComponent,
    OfferDetailsComponent,
    OfferListComponent,
    TermsAndPolicyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDividerModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    HttpClientModule
  ],
  providers: [
    HttpClientModule,
    SharedModule,
    LoginComponent,
    ...interceptors,
    { provide: LOCALE_ID, useValue: 'pt-BR' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
