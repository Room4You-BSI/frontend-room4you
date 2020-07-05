import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoggedGuard } from '@shared/guards/logged.guard';
import { NotLoggedGuard } from '@shared/guards/not-logged.guard';

import { AboutComponent } from './about/about.component';
import { AdvertiseComponent } from './advertise/advertise.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OfferDetailsComponent } from './offer-list/offer-details/offer-details.component';
import { OfferListComponent } from './offer-list/offer-list.component';
import { RegisterComponent } from './register/register.component';
import { TermsAndPolicyComponent } from './terms-and-policy/terms-and-policy.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'advertise',
    component: AdvertiseComponent,
    canActivate: [LoggedGuard],
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NotLoggedGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NotLoggedGuard],
  },
  {
    path: 'terms-and-policy',
    component: TermsAndPolicyComponent,
  },
  {
    path: 'offers',
    children: [
      {
        path: '',
        component: OfferListComponent,
        data: {listType: 'default', title: 'Todos os anuncios'}
      },
      {
        path: 'my-posts-list',
        component: OfferListComponent,
        data: {listType: 'my_posts', title: 'Meus Posts'}
      },
      {
        path: 'favorite-list',
        component: OfferListComponent,
        data: {listType: 'my_favorites', title: 'Meus Favoritos'}
      },
      {
        path: ':offerId',
        component: OfferDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
