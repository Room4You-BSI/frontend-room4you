import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';

import { tap } from 'rxjs/operators';

import { OfferCardColumnItemModel } from '@shared/models';


@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.scss']
})
export class OfferCardComponent implements OnInit {

  @Input() title: string;
  @Input() text: string;
  @Input() image: string;
  @Input() price: number;
  @Input() rate: number;
  @Input() distance: string;
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

  constructor(
    private breakpointObserver: BreakpointObserver,
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
  }

}
