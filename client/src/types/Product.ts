import { Bid } from './Bid';

export type Product = {
  _id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  isShow: boolean;
  bids: Bid[];
  startAt: Date;
  bidPriceMax: number;
  endAt: Date;
};
export type ProductForm = {
  title: string;
  price: number;
  description: string;
  category?: string;
  image: string;
  isShow: boolean;
};
