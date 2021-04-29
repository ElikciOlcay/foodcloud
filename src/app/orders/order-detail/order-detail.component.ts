import { Component, OnInit } from '@angular/core';
import { SelectedOrderQuery } from 'src/app/queries/orders.query';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  order: Order;

  constructor(
    private orderQuery: SelectedOrderQuery
  ) { }

  ngOnInit(): void {
    this.orderQuery.selectFirst().subscribe( order => {
      this.order = order;
    });
  }

}
