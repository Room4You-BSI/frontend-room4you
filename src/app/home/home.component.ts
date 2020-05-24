import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  offerCards = [
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

  constructor() { }

  ngOnInit() {
  }

}
