import { Injectable } from '@angular/core';
import { Query, QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { Order} from '../models/order.model';
import { OrderState, OrderStore} from '../store/orders.store';

@Injectable({ providedIn: 'root'})
export class OrdersQuery extends QueryEntity<OrderState, Order> {
  constructor(protected store: OrderStore) {
    super(store);
  }

  getFilteredOrdes(filter: string): Observable<Order[]> {
    return this.selectAll({
      filterBy: entity => entity.status === filter
    });
  }


}


