export interface CreateOfferModel {
  mora_local: boolean;
  restricao_sexo: 'm' | 'f' | 'n';
  pessoas_no_local: number;
  mobiliado: boolean;
  wifi: boolean;
  vaga_carro: boolean;
  mesa: boolean;
  meals: boolean;
  ar_condicionado: boolean;
  maquina_lavar: boolean;
  suite: boolean;
  tv: boolean;
  title: string;
  price: string;
  description: string;
  cep: string;
  rua: string;
  bairro: string;
  n_casa: string;
  cidade: string;
  estado: string;
  referencia: string;
  imgs: string[];
}
