import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';


declare var $: any;
declare var jQuery: any;

/**
 * Componente baseado no plugin jquery lightslider
 * dependência dos seguintes pacotes:
 * jquery
 * lightslider
 * lightgallery
 * lg-thumbnail
 * lg-autoplay
 * lg-video
 * lg-fullscreen
 * lg-pager
 * lg-zoom
 * lg-hash
 * lg-share
 *
 * https://www.npmjs.com/package/lightslider
 *
 * Mínima implementação para as necessidades do projeto,
 * mas com muitas possibilidades de personalização. Consulte
 * documentação no link acima
 */
@Component({
  selector: 'app-lightslider',
  templateUrl: './lightslider.component.html',
  styleUrls: ['./lightslider.component.scss']
})
export class LightsliderComponent implements AfterViewInit, OnDestroy {

  @ViewChild('imageGallery', {static: true}) imageGallery: ElementRef;

  @Input() images: string[] = [
    'https://images.madeiramadeira.com.br/product/images/75801354-quarto-de-solteiro-completo-com-guarda-roupa-closet-painel-cabeceira-e-nicho-mov-siena-moveis-1_zoom-1500x1500.jpg',
    'https://images.madeiramadeira.com.br/product/images/75801354-quarto-de-solteiro-completo-com-guarda-roupa-closet-painel-cabeceira-e-nicho-mov-siena-moveis-1_zoom-1500x1500.jpg',
    'https://images.madeiramadeira.com.br/product/images/75801354-quarto-de-solteiro-completo-com-guarda-roupa-closet-painel-cabeceira-e-nicho-mov-siena-moveis-1_zoom-1500x1500.jpg',
  ];

  @Input() title = 'Quarto São Paulo Tatuapé';

  @Input() rate = 3;
  @Input() favorite = false;
  @Input() mobileView = false;
  @Input() sliderWidth = 580;
  @Input() sliderHeight = 290;

  slider;

  constructor() {
    if (typeof $ === 'undefined' && typeof jQuery !== 'undefined') {
      $ = jQuery;
    }
  }

  ngAfterViewInit(): void {
    this.slider = $(this.imageGallery.nativeElement).lightSlider({
      gallery: true,
      item: 1,
      loop: true,
      thumbItem: 7,
      slideMargin: 0,
      enableDrag: false,
      autoWidth: true,
      controls: false,
      currentPagerPosition: 'left',
      onSliderLoad: el => {
        el.lightGallery({
            selector: '#imageGallery .lslide'
        });
      }
    });
  }

  previousSlide() {
    if (this.slider) {
      this.slider.goToPrevSlide();
    }
  }

  nextSlide() {
    if (this.slider) {
      this.slider.goToNextSlide();
    }
  }

  ngOnDestroy() {
    if (this.slider) {
      this.slider.destroy();
    }
  }
}
