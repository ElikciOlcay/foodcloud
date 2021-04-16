import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, Subscription } from 'rxjs';
import { Order } from '../models/order.model';
import { map, share } from 'rxjs/operators';
import { AuthService } from './auth.service';
import {Howl, Howler} from 'howler';

@Injectable({
  providedIn: 'root'
})
export class OrderService implements OnDestroy{

  selectedOrderChanged = new Subject<Order>();
  ordersChanged = new Subject<Order[]>();
  authChangedSubs: Subscription;
  private userId: string;
  private orders: Order[];

  sound = new Howl({
    src: ['../../assets/sounds/bell.wav']
  });

  private dummyOrders: Order[] = [
    {
      name: 'Johannes Huber',
      orderItems: [{name: 'Pizza'}, {name: 'Cola'}],
      price: 12.90,
      accepted: true
    },
    {
      name: 'Olcay Elikci',
      orderItems: [{name: 'Spaghetti'}, {name: 'Cola'}],
      price: 12.90,
      accepted: false
    }
  ];

  constructor(private db: AngularFirestore, private auth: AuthService) {

  }

  selectOrder(order: Order): void {
    this.selectedOrderChanged.next(order);
  }

  getOrders(): void {
    this.userId = this.auth.getCurrentUserId();
    this.db.collection('restaurants').doc(this.userId).collection('orders')
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
        this.hasNotAcceptedOrder(orders);
        this.ordersChanged.next(this.orders);
      });
  }

  hasNotAcceptedOrder(orders: Order[]): void {
    orders.every(order => {
      if (order.accepted === false) {
        this.sound.once('load', () => {
          this.sound.play();
        });
        return false;
      }
      return true;
    });
  }


  filterOrders(status: string): void {
    const filteredOrders = this.orders.filter(item => {
      return item.status === status;
    });
    this.ordersChanged.next(filteredOrders);
  }


  addTest(): void {
    this.db.collection('restaurants').doc(this.userId).collection('orders')
      .add(this.dummyOrders[1])
      .then(ref => {
        console.log(ref);
      });
  }

  ngOnDestroy(): void {
    this.authChangedSubs.unsubscribe();
  }

}
