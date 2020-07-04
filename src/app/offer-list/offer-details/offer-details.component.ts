import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthorModel, OfferDetailsModel } from '@shared/models';

import { OfferService } from '../../shared/services/offer.service';


@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss']
})
export class OfferDetailsComponent implements OnInit {

  id: any;
  details$: Observable<OfferDetailsModel>;
  author$: Observable<AuthorModel>;
  address: string;

  genderRestrictions = {
    m: 'Restrito para homens.',
    f: 'Restrito para mulheres.',
    n: 'Sem restrição de sexo.',
  };

  peapleLivinMsgs = [
    'Nenhuma pessoa mora no local.',
    '1 pessoa mora no local.',
    'pessoas moram no local.',
  ];

  private readonly sizeLT854Txt = '(max-width: 853.99px)';
  sizeLT854 = false;

  private readonly sizeLT650Txt = '(max-width: 649.99px)';
  sizeLT650 = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private offerService: OfferService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.breakpointObserver.observe([
      this.sizeLT854Txt,
      this.sizeLT650Txt,
    ]).pipe(tap(result => {
      this.sizeLT854 = result.breakpoints[this.sizeLT854Txt];
      this.sizeLT650 = result.breakpoints[this.sizeLT650Txt];
    })).subscribe();

    this.route.paramMap.subscribe(params => {
      if (params.has('offerId')) {
        this.id = params.get('offerId');
      }
    });

    this.details$ = this.offerService.offerDetails(this.id).pipe(
      tap(response => {
        this.address = `Rua ${response.address}, ${response.n_casa}, ${response.bairro} - ${response.city}-${response.state}`;
        this.author$ = this.offerService.getAuthor(response.post_id);
      }),
    );
  }

}
