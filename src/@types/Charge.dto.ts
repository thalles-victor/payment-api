import { ICard } from "./card";

export interface ChardDTO {
  installments: number;
  title: string;
  price: number;
  card: ICard;
}
