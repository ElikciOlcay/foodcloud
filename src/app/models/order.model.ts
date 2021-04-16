import { OrderItem } from './order-item';

export interface Order {
  id?: string;
  name: string;
  date?: Date;
  status?: string;
  orderItems: OrderItem[];
  price: number;
  accepted: boolean;
}
