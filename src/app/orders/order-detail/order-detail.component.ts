import { Component, Input, OnInit } from '@angular/core';
import { OrdersQuery } from 'src/app/queries/orders.query';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  @Input() order: Order;

  constructor() { }

  ngOnInit(): void {

  }

}
