import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EventManager } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';
import {Howl, Howler} from 'howler';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit, AfterViewInit{

  orders = new MatTableDataSource<Order>();
  selectedOrder: Order;
  selectedOrderSubscription: Subscription;
  orderSubscription: Subscription;
  displayedColumns: string[] = ['name'];

  sound = new Howl({
    src: ['../../assets/sounds/bell.wav']
  });

  @ViewChild(MatPaginator) paninator: MatPaginator;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    // tslint:disable-next-line: deprecation
    this.selectedOrderSubscription = this.orderService.selectedOrderChanged.subscribe(order => {
      this.selectedOrder = order;
    });
    // tslint:disable-next-line: deprecation
    this.orderSubscription = this.orderService.ordersChanged.subscribe(order => {
      this.orders.data = order;
    });
    this.orderService.getOrders();
  }

  filterOrders(filter: string): void {
    this.orderService.filterOrders(filter);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.orderService.selectOrder(this.orders.data[0]);
    }, 500);
    this.orders.paginator = this.paninator;
  }

  onSelectOrder(order: Order): void {
    this.orderService.selectOrder(order);
  }

  makeOrder(): void {
    this.orderService.addTest();
  }

}
