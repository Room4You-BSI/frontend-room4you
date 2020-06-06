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
    'https://sachinchoolur.github.io/lightslider/img/cS-1.jpg',
    'https://sachinchoolur.github.io/lightslider/img/cS-2.jpg',
    'https://sachinchoolur.github.io/lightslider/img/cS-3.jpg',
    'https://sachinchoolur.github.io/lightslider/img/cS-4.jpg',
    'https://sachinchoolur.github.io/lightslider/img/cS-5.jpg',
    'https://sachinchoolur.github.io/lightslider/img/cS-6.jpg',
    'https://sachinchoolur.github.io/lightslider/img/cS-7.jpg',
    'https://sachinchoolur.github.io/lightslider/img/cS-8.jpg',
    'https://sachinchoolur.github.io/lightslider/img/cS-9.jpg',
    'https://sachinchoolur.github.io/lightslider/img/cS-10.jpg',
    'https://sachinchoolur.github.io/lightslider/img/cS-11.jpg',
    'https://sachinchoolur.github.io/lightslider/img/cS-12.jpg',
  ];

  @Input() title = 'Quarto São Paulo Tatuapé';

  @Input() rate = 3;
  @Input() favorite = false;
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
      currentPagerPosition: 'left',
      onSliderLoad: el => {
        el.lightGallery({
            selector: '#imageGallery .lslide'
        });
      }
    });
  }

  ngOnDestroy() {
    this.slider.destroy();
  }
}
