import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { tap } from 'rxjs/operators';

import { OfferCardItemModel } from '@shared/models';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  offerCards: OfferCardItemModel[] = [
    {
      title: 'Quarto São Paulo Tatuapé',
      text: `Mussum Ipsum, cacilds vidis litro abertis. Nec orci ornare consequat. Praesent lacinia ultrices
        consectetur. Sed non ipsum felis. Aenean aliquam molestie leo, vitae iaculis nisl. Mé faiz
        elementum girarzis nisi eros.`,
      image: 'https://media.gazetadopovo.com.br/haus/2018/10/quarto-infantil-dia-da-crianca-decoracao-design-arquitetura-dicas-karina-korn-5-768x521-baa14530.jpg',
      price: 450,
      rate: 3,
      distance: '3,2 km do centro',
      favorite: false,
      attributesColumn1: [{label: 'Vaga', available: true}, {label: 'Wi-fi', available: true}],
      attributesColumn2: [{label: 'Suíte', available: true}],
    },
    {
      title: 'Quarto São Carlos',
      text: `Mussum Ipsum, cacilds vidis litro abertis. Nec orci ornare consequat. Praesent lacinia ultrices
        consectetur. Sed non ipsum felis. Aenean aliquam molestie leo, vitae iaculis nisl. Mé faiz
        elementum girarzis nisi eros.`,
      image: 'https://q-cf.bstatic.com/images/hotel/max1024x768/200/200710933.jpg',
      price: 530,
      rate: 2,
      distance: 'Próximo a USP',
      favorite: true,
      attributesColumn1: [{label: 'Vaga', available: false}, {label: 'Wi-fi', available: true}],
      attributesColumn2: [{label: 'Suíte', available: true}],
    },
    {
      title: 'Dormitório em Ibaté',
      text: `Mussum Ipsum, cacilds vidis litro abertis. Nec orci ornare consequat. Praesent lacinia ultrices
        consectetur. Sed non ipsum felis. Aenean aliquam molestie leo, vitae iaculis nisl. Mé faiz
        elementum girarzis nisi eros.`,
      image: 'https://images.madeiramadeira.com.br/product/images/75801354-quarto-de-solteiro-completo-com-guarda-roupa-closet-painel-cabeceira-e-nicho-mov-siena-moveis-1_zoom-1500x1500.jpg',
      price: 390,
      rate: 4,
      distance: '1,5 km do centro',
      favorite: false,
      attributesColumn1: [{label: 'Vaga', available: true}, {label: 'Wi-fi', available: true}],
      attributesColumn2: [{label: 'Suíte', available: false}],
    },
  ];

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
  ) {}

  ngOnInit() {
    this.breakpointObserver.observe([
      this.sizeLT800Txt,
      this.sizeLT600Txt,
    ]).pipe(tap(result => {
      this.sizeLT800 = result.breakpoints[this.sizeLT800Txt];
      this.sizeLT600 = result.breakpoints[this.sizeLT600Txt];
    })).subscribe();
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
