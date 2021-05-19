import { OrderItem } from './order-item';

export class OrderStatusModel {
  readonly new = 'new';
  readonly kitchen = 'kitchen';
  readonly finished = 'finished';

  getStateList(): string[] {
    return [this.new, this.kitchen, this.finished];
  }
}

export interface Order {
  id?: string;
  name: string;
  date?: Date;
  status: string;
  orderItems: OrderItem[];
  price: number;
  accepted: boolean;
}


