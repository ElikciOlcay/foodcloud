import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { OrderItem } from '../models/order-item';
import { Order } from '../models/order.model';
import { flatMap, map } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  selectedOrderChanged = new Subject<Order>();
  ordersChanged = new Subject<Order[]>();

  private orders: Order[];
  private dummyOrders: Order[] = [
    {
      name: 'Johannes Huber',
      orderItems: [{name: 'Pizza'}, {name: 'Cola'}]
    }
  ];

  constructor(private db: AngularFirestore) {
    this.addDummyData();
  }

  selectOrder(order: Order): void {
    this.selectedOrderChanged.next(order);
  }

  getOrders(): void {
    this.db.collection('orders')
      .snapshotChanges()
      .pipe(
        map(ordersFromDb => ordersFromDb
          .map(data => {
            const orders = data.payload.doc.data() as Order;
            const id = data.payload.doc.id;
            return { ...orders, id };
          }
          )
        )
      ).subscribe((orders: Order[]) => {
        this.orders = orders;
        this.orders.forEach(order => {
          this.db.collection('orders').doc(order.id).collection('orderItems')
            .valueChanges()
            .subscribe((items: any[]) => {
              order.orderItems = items;
              this.ordersChanged.next([...this.orders]);
            });
        });
      });
  }

  filterOrders(status: string): void {
    const filteredOrders = this.orders.filter(item => {
      return item.status === status;
    });
    this.ordersChanged.next(filteredOrders);
  }

  addDummyData(): void {
    for (let i = 0; i < 1; i++ ) {
      this.db.collection('orders').add(this.dummyOrders[0]).then( ref => {
        const orderId = ref.id;
        this.dummyOrders[0].orderItems.forEach(orderItem => {
          this.db.collection(`orders/${orderId}/orderItems`).add(orderItem);
        });
      });
    }
  }

}
