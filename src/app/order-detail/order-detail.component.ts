import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from '../models/order.model';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  order: Order;
  selectedOrderSubscription: Subscription;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.selectedOrderSubscription = this.orderService.selectedOrderChanged.subscribe(
      {
        next: order => this.order = order
      }
    );
  }

}
