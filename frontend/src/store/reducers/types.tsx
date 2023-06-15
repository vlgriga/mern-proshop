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

export interface IShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  token?: string;
}

// Order Slice
export interface IOrder {
  orderItems: ICartProduct[];
  shippingAddress: IShippingAddress;
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
}
