import { AfterViewInit, Component, Input, OnInit, Output } from '@angular/core';
import { OrdersQuery } from 'src/app/queries/orders.query';
import { OrderService } from 'src/app/services/order.service';
import { Order, OrderStatusModel } from '../../models/order.model';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit, AfterViewInit {

  order: Order;
  orderStateModel = new OrderStatusModel();
  nextStatus: string;

  constructor(private os: OrderService, private orderQuery: OrdersQuery) { }


  ngAfterViewInit(): void {
    this.setNextOrderState();
  }

  ngOnInit(): void {
    this.orderQuery.selectActive().subscribe( order => {
      this.order = order;
      this.setNextOrderState();
    });
  }

  changeOrderState(): void {
    this.os.updateOrder(this.order, this.nextStatus);
  }



  setNextOrderState(): void {
    const statusList = this.orderStateModel.getStateList();
    statusList.forEach( (status, index) => {
      if (status === this.order.status && index + 1 < statusList.length ) {
        this.nextStatus = statusList[index + 1];
      }
    });
  }
}
