import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

import { OfferCardItemModel } from '@shared/models';
import { GlobalEvents } from '@shared/utils';

import { OfferService } from '../shared/services/offer.service';


@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss']
})
export class OfferListComponent implements OnInit, OnDestroy {

  offerCards: OfferCardItemModel[];

  title: string;
  listType: string;
  subs: Subscription[] = [];

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

  search: string[] = [];

  loaded = false;

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
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.breakpointObserver.observe([
      this.sizeLT800Txt,
      this.sizeLT600Txt,
    ]).pipe(tap(result => {
      this.sizeLT800 = result.breakpoints[this.sizeLT800Txt];
      this.sizeLT600 = result.breakpoints[this.sizeLT600Txt];
    })).subscribe();

    this.subs.push(GlobalEvents.get('search').pipe(
      tap(response => {
        if (this.listType === 'default') {
          this.getObservable(this.listType, [...this.search, ...response]).subscribe();
        }
      }),
    ).subscribe());

    this.subs.push(this.route.data.pipe(
      tap(data => {
        this.getObservable(data.listType).subscribe();
        this.listType = data.listType;
        this.title = data.title;
      }),
    ).subscribe());
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

  navigateTo(route) {
    this.router.navigate([route]);
  }

  addToSearch(key: string) {
    if (this.listType === 'default') {
      this.search.push(key);
      this.subs.push(this.getObservable(this.listType, this.search).subscribe());
    }
  }

  rmFromSearch(key: string) {
    if (this.listType === 'default') {
      const index = this.search.indexOf(key);
      if (index > -1) {
        this.search.splice(index, 1);
      }
      this.subs.push(this.getObservable(this.listType, this.search).subscribe());
    }
  }

  private getObservable(listType: string, search: string[] = []) {
    switch (listType || 'default') {
      case 'my_posts':
        return this.offerService.getMyPosts().pipe(
          tap(response => this.offerCards = response),
          finalize(() => this.loaded = true),
        );

      case 'my_favorites':
        return this.offerService.getMyFavorites().pipe(
          tap(response => this.offerCards = response),
          finalize(() => this.loaded = true),
        );

      default:
        return this.offerService.getOffers(search).pipe(
          tap(response => this.offerCards = response),
          finalize(() => this.loaded = true),
        );
    }
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
