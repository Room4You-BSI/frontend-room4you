export interface OfferDetailsModel {
  rate: number;
  favorite: boolean;
  post_id: number;
  title: string;
  text: string;
  image: string;
  price: number;
  address: string;
  bairro: string;
  cep: string;
  city: string;
  state: string;
  n_casa: string;
  mora_local: boolean;
  referencia: string;
  restricao_sexo: string;
  pessoas_no_local: string;
  mobiliado: boolean;
  attributes: {
    label: string,
    available: boolean,
  }[];
}

export interface AuthorModel {
  name: string;
  email: string;
  email_contato: string;
  tel: string;
  description: string;
  img: string;
}
