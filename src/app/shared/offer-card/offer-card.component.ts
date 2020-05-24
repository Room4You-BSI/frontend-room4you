import { Component, Input, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {}

}
