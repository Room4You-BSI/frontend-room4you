export interface OfferCardColumnItemModel {
  label: string;
  available: boolean;
}

export interface OfferCardItemModel {
  title: string;
  text: string;
  image: string;
  price: number;
  rate: number;
  distance: string;
  favorite: boolean;
  attributesColumn1: OfferCardColumnItemModel[];
  attributesColumn2: OfferCardColumnItemModel[];
}
