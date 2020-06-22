import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { tap } from 'rxjs/operators';

import { OfferCardItemModel } from '@shared/models';

import { OfferService } from '../shared/services/offer.service';


@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss']
})
export class OfferListComponent implements OnInit {

  offerCards: OfferCardItemModel[];

  amenityOptions: {label: string; control: FormControl}[] = [
    {label: 'Suíte', control: new FormControl(false)},
    {label: 'Ar', control: new FormControl(false)},
    {label: 'Ventilador', control: new FormControl(false)},
    {label: 'TV', control: new FormControl(false)},
    {label: 'Refeições Inclusas', control: new FormControl(false)},
    {label: 'Garagem', control: new FormControl(false)},
    {label: 'PETs', control: new FormControl(false)},
    {label: 'Mobiliado', control: new FormControl(false)},
  ];

  priceFrom = new FormControl(500);
  priceTo = new FormControl(700);
  lengthOfStay = new FormControl(null);

  lengthOfStayList: {label: string; value: string}[] = [
    {label: '1 mês', value: '1'},
    {label: '2 meses', value: '2'},
    {label: '3 meses', value: '3'},
    {label: '4 meses', value: '4'},
    {label: '5 meses', value: '5'},
    {label: '6 meses', value: '6'},
    {label: '1 ano', value: '12'},
  ];

  private readonly sizeLT800Txt = '(max-width: 799.99px)';
  sizeLT800 = false;

  private readonly sizeLT600Txt = '(max-width: 599.99px)';
  sizeLT600 = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private offerService: OfferService,
  ) {}

  ngOnInit() {
    this.breakpointObserver.observe([
      this.sizeLT800Txt,
      this.sizeLT600Txt,
    ]).pipe(tap(result => {
      this.sizeLT800 = result.breakpoints[this.sizeLT800Txt];
      this.sizeLT600 = result.breakpoints[this.sizeLT600Txt];
    })).subscribe();

    this.offerService.getOffers().pipe(
      tap(response => this.offerCards = response),
    ).subscribe();

  }

  checkPriceInputValues(controlFrom: FormControl, controlTo: FormControl) {
    if (controlTo.value < controlFrom.value) {
      controlTo.setValue(controlFrom.value);
    }
  }

  sortOfferCars(cards: OfferCardItemModel[]) {
    // TODO: Ordenar de verdade, por equanto só faz o shuffle
    let equals = true;
    const sequenceBefore: string[] = cards.map(card => card.title);

    while (equals) {
      cards.sort(() => Math.random() - 0.5);
      const sequenceAfter: string[] = cards.map(card => card.title);
      equals = sequenceBefore.length === sequenceAfter.length && sequenceBefore.every((value, index) => value === sequenceAfter[index]);
    }
  }

}
