import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';

import { finalize, tap } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import { OfferService } from '../../services/offer.service';


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

  @Input() images: string[] = [];
  @Input() id: any;

  @Input() title = 'Quarto São Paulo Tatuapé';

  @Input() rate = 3;
  @Input() favorite = false;
  @Input() mobileView = false;
  @Input() sliderWidth = 580;
  @Input() sliderHeight = 290;

  slider;
  favoriteLoading = false;

  constructor(
    private authService: AuthService,
    private offerService: OfferService,
  ) {
    if (typeof $ === 'undefined' && typeof jQuery !== 'undefined') {
      $ = jQuery;
    }
  }

  ngAfterViewInit(): void {
    if (this.images.length === 0) {
      this.images.push('https://via.placeholder.com/950/8B8B8B/477D82/?text=Room4You');
    }

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

  toggleFavorite(favorite) {
    if (this.favoriteLoading || !this.authService.isLoggedIn()) { return; }
    this.favoriteLoading = true;
    if (favorite) {
      this.offerService.removeFavorite(this.id).pipe(
        tap(() => this.favorite = false),
        finalize(() => this.favoriteLoading = false),
      ).subscribe();
    } else {
      this.offerService.addToFavorite(this.id).pipe(
        tap(() => this.favorite = true),
        finalize(() => this.favoriteLoading = false),
      ).subscribe();
    }
  }

  ngOnDestroy() {
    if (this.slider) {
      this.slider.destroy();
    }
  }
}
