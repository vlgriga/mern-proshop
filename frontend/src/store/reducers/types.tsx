// Product Slice
export interface IProduct {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
}

export interface ICartProduct extends IProduct {
  qty: number;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  token?: string;
}
