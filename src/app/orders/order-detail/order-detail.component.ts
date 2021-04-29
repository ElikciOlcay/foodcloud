import { Component, OnInit } from '@angular/core';
import { OrdersQuery } from 'src/app/queries/orders.query';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  order: Order;

  constructor(
    private orderQuery: OrdersQuery
  ) { }

  ngOnInit(): void {
    this.orderQuery.selectActive().subscribe( order => {
      this.order = order;
    });
  }

}
