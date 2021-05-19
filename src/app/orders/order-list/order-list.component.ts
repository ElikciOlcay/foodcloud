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
  selectedOrder$: Observable<Order>;
  activeOrder: Order;
  orderSubs: Subscription;
  orderStatus = new OrderStatusModel();
  loading$: Observable<boolean>;


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
    this.loading$ = this.orderQuery.selectLoading();
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
    this.orderStore.setLoading(true);
    this.orderStore.setActive(order.id);
    this.orderStore.setLoading(false);
    this.selectedOrder$ = this.orderQuery.selectActive();
    this.activeOrder = this.orderQuery.getActive();
  }

  makeOrder(): void {
    this.orderService.addTest();
  }

  ngOnDestroy(): void {
    this.orderSubs.unsubscribe();
  }

}
