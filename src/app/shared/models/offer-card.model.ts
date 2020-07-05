export interface OfferCardColumnItemModel {
  label: string;
  available: boolean;
}

export interface OfferCardItemModel {
  post_id: number;
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
