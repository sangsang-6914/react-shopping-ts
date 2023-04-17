export interface IProduct {
  id?: string;
  title: string;
  price: string;
  description?: string;
  image: string;
  options: string;
  quantity?: number;
}

export interface IProductProps {
  product: {
    category: string;
    description: string;
    id: string;
    image: string;
    options?: [];
    option?: string;
    price: number;
    title: string;
    quantity?: number;
  };
}
