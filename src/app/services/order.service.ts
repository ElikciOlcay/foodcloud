import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject, Subscription, throwError } from 'rxjs';
import { Order, OrderStatusModel} from '../models/order.model';
import { catchError, map, share } from 'rxjs/operators';
import { AuthService } from './auth.service';
import {Howl, Howler} from 'howler';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderStore } from '../store/orders.store';

@Injectable({
  providedIn: 'root'
})
export class OrderService implements OnDestroy{

  selectedOrderChanged = new Subject<Order>();
  ordersChanged = new Subject<Order[]>();
  private userId: string;

  sound = new Howl({
    src: ['../../assets/sounds/bell.wav']
  });

  private dummyOrders: Order[] = [
    {
      name: 'Johannes Huber',
      orderItems: [{name: 'Pizza'}, {name: 'Cola'}],
      price: 12.90,
      accepted: true,
      status: new OrderStatusModel().new
    },
    {
      name: 'Aras Elikci',
      orderItems: [{name: 'Spaghetti'}, {name: 'Fanta'}],
      price: 12.90,
      accepted: false,
      status: new OrderStatusModel().kitchen
    }
  ];

  constructor(
    private orderStore: OrderStore,
    private db: AngularFirestore,
    private auth: AuthService,
    private snackBar: MatSnackBar
    )
    {}

  getOrders(): void {
    this.userId = this.auth.getCurrentUserId();
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
      ).subscribe( orders => {
        this.orderStore.set(orders);
      });
  }


  errorHandler(error: string): Observable<any> {
    this.snackBar.open(error);
    return throwError(error);
  }


  addTest(): void {
    this.db.collection('restaurants').doc(this.userId).collection('orders')
      .add(this.dummyOrders[1])
      .then(ref => {
        console.log(ref);
      });
  }

  ngOnDestroy(): void {

  }

}
