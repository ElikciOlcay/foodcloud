import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { Order, OrderStatusModel } from '../../models/order.model';
import { OrderService } from '../../services/order.service';
import {Howl, Howler} from 'howler';
import { OrdersQuery } from 'src/app/queries/orders.query';
import { OrderStore } from 'src/app/store/orders.store';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit, AfterViewInit, OnDestroy{

  orders = new MatTableDataSource<Order>();
  displayedColumns: string[] = ['name'];
  selectLoading$: Observable<boolean>;
  orderStatus = new OrderStatusModel();
  selectedOrder: Order;
  orderSubs: Subscription;
  selectedOrderSubs: Subscription;


  @ViewChild('filter') filter$;
  @ViewChild(MatPaginator) paninator: MatPaginator;


  sound = new Howl({
    src: ['../../assets/sounds/bell.wav']
  });

  constructor(
    private orderService: OrderService,
    private orderQuery: OrdersQuery,
    private orderStore: OrderStore
  ) { }


  ngOnInit(): void {
    this.filterOrders(this.orderStatus.new);
    this.selectLoading$ = this.orderQuery.selectLoading();
    this.orderService.getOrders();
  }


  filterOrders(filter: string): void {
    this.orderSubs = this.orderQuery.getFilteredOrdes(filter).subscribe( order => {
      this.orders.data = order;
      if (order.length) {
        this.onSelectOrder(order[0]);
      }
    });
  }

  ngAfterViewInit(): void {
    this.orders.paginator = this.paninator;
 }

  onSelectOrder(order: Order): void {
    this.orderStore.setActive(order.id);
    this.selectedOrderSubs = this.orderQuery.selectActive().subscribe( selectedOrder => {
      this.selectedOrder = selectedOrder;
    });
  }

  makeOrder(): void {
    this.orderService.addTest();
  }

  ngOnDestroy(): void {
    debugger
    this.orderSubs.unsubscribe();
    this.selectedOrderSubs.unsubscribe();
  }

}
