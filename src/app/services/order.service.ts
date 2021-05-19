import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject, throwError } from 'rxjs';
import { Customer, Order, OrderStatusModel } from '../models/order.model';
import { catchError, map, share } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Howl, Howler } from 'howler';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderStore } from '../store/orders.store';
import { OrderItem } from '../models/order-item';

@Injectable({
  providedIn: 'root'
})
export class OrderService implements OnDestroy {

  ordersChanged = new Subject<Order[]>();
  private userId: string;

  sound = new Howl({
    src: ['../../assets/sounds/bell.wav']
  });

  private customer: Customer = {
    firstName: 'Özgür',
    lastName: 'Elikci',
    street: 'Erszstraße',
    nr: '22',
    plz: '5500',
    city: 'Bischofshofen',
    tel: '069917058498'
  };

  private orderItems: OrderItem[] = [
    {
      menu: { name: 'Pizza', price: 10.90 },
      quanitity: 1,
      total: 10.90
    },
    {
      menu: { name: 'Bier', price: 2.90 },
      quanitity: 2,
      total: 5.80
    }
  ];

  private dummyOrders: Order[] = [
    {
      customer: this.customer,
      orderItems: this.orderItems,
      price: 13.90,
      accepted: true,
      status: new OrderStatusModel().new
    }
  ];

  constructor(
    private orderStore: OrderStore,
    private db: AngularFirestore,
    private auth: AuthService,
    private snackBar: MatSnackBar
  ) { }

  getOrders(): void {
    this.userId = this.auth.getCurrentUser().uid;
    this.db.collection('restaurants').doc(this.userId).collection('orders')
      .snapshotChanges()
      .pipe(
        map(ordersFromDb => ordersFromDb.map(data => {
            const orders = data.payload.doc.data() as Order;
            const id = data.payload.doc.id;
            return { ...orders, id };
            }
        ),
        ),
        catchError(this.errorHandler)
      ).subscribe(orders => {
        this.orderStore.set(orders);
      });
  }

  updateOrder(order: Order, status: string): void {
    this.db.collection('restaurants').doc(this.userId).collection<Order>('orders').doc<Order>(order.id)
      .update({
        ...order,
        status
      }
    );
  }


  errorHandler(error: string): Observable<any> {
    this.snackBar.open(error);
    return throwError(error);
  }


  addTest(): void {
    this.db.collection('restaurants').doc(this.userId).collection('orders')
      .add(this.dummyOrders[0])
      .then(ref => {
        console.log(ref);
      });
  }

  ngOnDestroy(): void {

  }

}
