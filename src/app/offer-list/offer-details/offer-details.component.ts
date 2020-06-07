import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss']
})
export class OfferDetailsComponent implements OnInit {

  private readonly sizeLT854Txt = '(max-width: 853.99px)';
  sizeLT854 = false;

  private readonly sizeLT650Txt = '(max-width: 649.99px)';
  sizeLT650 = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
  ) {}

  ngOnInit(): void {
    this.breakpointObserver.observe([
      this.sizeLT854Txt,
      this.sizeLT650Txt,
    ]).pipe(tap(result => {
      this.sizeLT854 = result.breakpoints[this.sizeLT854Txt];
      this.sizeLT650 = result.breakpoints[this.sizeLT650Txt];
    })).subscribe();
  }

}
