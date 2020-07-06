import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';

import { finalize, tap } from 'rxjs/operators';

import { OfferCardColumnItemModel } from '@shared/models';

import { AuthService } from '../../services/auth.service';
import { OfferService } from '../../services/offer.service';


@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.scss']
})
export class OfferCardComponent implements OnInit {

  @Input() id: number;
  @Input() title: string;
  @Input() text: string;
  @Input() image: string;
  @Input() price: number;
  @Input() rate: number;
  @Input() distance?: string;
  @Input() cidade: string;
  @Input() estado: string;
  @Input() favorite = false;
  @Input() attributesColumn1: OfferCardColumnItemModel[];
  @Input() attributesColumn2: OfferCardColumnItemModel[];

  @Input() descriptionLimit = 216;

  private readonly size1000to1300Txt = '(min-width: 1000px) and (max-width: 1299.99px)';
  size1000to1300 = false;

  private readonly sizeLT1000Txt = '(max-width: 999.99px)';
  sizeLT1000 = false;

  private readonly sizeLT800Txt = '(max-width: 799.99px)';
  sizeLT800 = false;

  favoriteLoading = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private offerService: OfferService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.breakpointObserver.observe([
      this.size1000to1300Txt,
      this.sizeLT1000Txt,
      this.sizeLT800Txt,
    ]).pipe(tap(result => {
      this.size1000to1300 = result.breakpoints[this.size1000to1300Txt];
      this.sizeLT1000 = result.breakpoints[this.sizeLT1000Txt];
      this.sizeLT800 = result.breakpoints[this.sizeLT800Txt];
    })).subscribe();

    if (!this.image) {
      this.image = 'https://via.placeholder.com/950/8B8B8B/477D82/?text=Room4You';
    }
  }

  toggleFavorite(favorite) {
    if (this.favoriteLoading || !this.authService.isLoggedIn()) { return; }
    this.favoriteLoading = true;
    if (favorite) {
      this.offerService.removeFavorite(this.id).pipe(
        tap(() => this.favorite = false),
        finalize(() => this.favoriteLoading = false),
      ).subscribe();
    } else {
      this.offerService.addToFavorite(this.id).pipe(
        tap(() => this.favorite = true),
        finalize(() => this.favoriteLoading = false),
      ).subscribe();
    }
  }
}
