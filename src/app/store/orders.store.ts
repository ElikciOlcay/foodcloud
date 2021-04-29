import { Injectable } from '@angular/core';
import { ActiveState, EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Order } from '../models/order.model';

export interface OrderState extends EntityState<Order, string>, ActiveState {}

@Injectable({ providedIn: 'root'})
@StoreConfig({ name: 'orders'})
export class OrderStore extends EntityStore<OrderState, Order> {
  constructor() {
    super();
  }
}



