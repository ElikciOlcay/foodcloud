import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Order } from '../models/order.model';

export interface OrderState extends EntityState<Order> {}

@Injectable({ providedIn: 'root'})
@StoreConfig({ name: 'orders'})
export class OrderStore extends EntityStore<OrderState, Order> {
  constructor() {
    super();
  }
}

export interface SelectedOrderState extends EntityState<Order>{}

@Injectable({ providedIn: 'root'})
@StoreConfig({ name: 'selectedOrder'})
export class SelectedOrderStore extends EntityStore<SelectedOrderState, Order> {
  constructor() {
    super();
  }
}

