import { Component, OnInit } from '@angular/core';
import { ListingsService } from '../../listings.service';
import { Order } from '../../shared/models/Order';

@Component({
  selector: 'app-driver-page',
  templateUrl: './driver-page.component.html',
  styleUrl: './driver-page.component.css'
})
export class DriverPageComponent implements OnInit{
  orders: Order[] = [];
  orderToComplete!:number;

  constructor(
    private driverService: ListingsService,
  ) { }

  ngOnInit(): void {
    this.driverService.getAllOrders().subscribe(orders => {
      console.log("orders loaded");
      this.orders = orders;
    });
  }

  completeOrder(): void {
    this.driverService.fullfilOrder(this.orderToComplete).subscribe(orders => {
      this.driverService.getAllOrders().subscribe(orders => {
        // console.log("orders loaded");
        this.orders = orders;
      });
    });
  }

}
