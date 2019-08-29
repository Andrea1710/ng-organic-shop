import { ShoppingCart } from "./../models/shopping-cart";
import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { OrderService } from "../order.service";
import { Order } from "../models/order";

@Component({
  selector: "shipping-form",
  templateUrl: "./shipping-form.component.html",
  styleUrls: ["./shipping-form.component.css"]
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input("cart") cart: ShoppingCart;
  shipping = {};
  userId: string;
  subscription: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.subscription = this.authService.user$.subscribe(
      user => (this.userId = user.uid)
    );
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(["/order-success", result.key]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
