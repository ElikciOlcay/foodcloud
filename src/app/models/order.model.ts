import { OrderItem } from './order-item';

export class OrderStatusModel {
  readonly new = 'new';
  readonly kitchen = 'kitchen';
  readonly finished = 'finished';

  getStateList(): string[] {
    return [this.new, this.kitchen, this.finished];
  }
}

export interface Customer {
  firstName: string;
  lastName: string;
  street: string;
  nr: string;
  plz: string;
  city: string;
  tel: string;
}

export interface Order {
  id?: string;
  customer: Customer;
  date?: Date;
  status: string;
  orderItems: OrderItem[];
  price: number;
  accepted: boolean;
}


