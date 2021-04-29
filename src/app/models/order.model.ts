import { ID } from '@datorama/akita';
import { OrderItem } from './order-item';

export class OrderStatusModel {
  id?: ID;
  readonly new = 'new';
  readonly kitchen = 'kitchen';
}

export interface Order {
  id?: ID;
  name: string;
  date?: Date;
  status: string;
  orderItems: OrderItem[];
  price: number;
  accepted: boolean;
}


