import { Injectable } from '@angular/core';
import { Query, QueryEntity } from '@datorama/akita';
import { Order} from '../models/order.model';
import { OrderState, OrderStore, SelectedOrderState, SelectedOrderStore} from '../store/orders.store';

@Injectable({ providedIn: 'root'})
export class OrdersQuery extends QueryEntity<OrderState, Order> {
  constructor(protected store: OrderStore) {
    super(store);
  }
}

@Injectable({ providedIn: 'root'})
export class SelectedOrderQuery extends QueryEntity<SelectedOrderState, Order> {
  constructor(protected store: SelectedOrderStore) {
    super(store);
  }
}

