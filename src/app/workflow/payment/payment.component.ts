import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart } from '@app/_models/cart';
import { CreditCard } from '@app/_models/creditCard';
import { Order } from '@app/_models/order';
import { OrderDetail } from '@app/_models/orderDetail';
import { AuthenticationService } from '@app/_services/authentication.service';
import { OrderService } from '@app/_services/order.service';
import { StoreService } from '@app/_services/store.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  @Input('creditcard') card?:CreditCard;

  paymentForm = new FormGroup({
    cardnumber: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{16}$/)]),
    holdername: new FormControl('', Validators.required),
    code: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{3}$/)]),
    expirymonth: new FormControl('', Validators.required),
    expiryyear: new FormControl('', Validators.required)
  });  
  constructor(private authenticationService: AuthenticationService,
              private storeService: StoreService,
              private orderService: OrderService,
              private router: Router) { }

  ngOnInit(): void {
    this.paymentForm.controls.cardnumber.setValue(this?.card?.cardNumber);
    this.paymentForm.controls.holdername.setValue(this?.card?.holderName);
    this.paymentForm.controls.code.setValue(this?.card?.code);
    this.paymentForm.controls.expirymonth.setValue(this?.card?.expiryDate?.getMonth());
    this.paymentForm.controls.expiryyear.setValue(this?.card?.expiryDate?.getFullYear());
  }

  onSubmit():void{
    console.warn(this.paymentForm.value);

    let order:Order = new Order();
    order.userId = this?.authenticationService?.currentUserValue?.id || 0;
    order.orderDetails = this.storeService.cart.cartItems.map(
        (cartItem) => {
          let orderDetail:OrderDetail = new OrderDetail();
          orderDetail.itemId = cartItem.item.id;
          orderDetail.quantity = cartItem.quantity;
          return orderDetail;
        });
    order.deliveryAddressId = this.storeService.deliveryAddress;
    order.creditCard = {...this.paymentForm.value, ...{expiryDate: new Date(this.paymentForm.controls.expiryyear.value, this.paymentForm.controls.expirymonth.value, 1)}};
    console.warn(order);

    if(this?.authenticationService?.currentUserValue?.id || 0 > 0){
      this.orderService.addOrder(order)
          .subscribe((orderResult: Order) => {
            console.log(orderResult);
            this.storeService.order = orderResult;
            this.storeService.cart = new Cart();
            this.storeService.deliveryAddress = -1;
            
            this.router.navigate(['/summary']);
          })
    }       
  }

  numSequence(n: number): Array<number> { 
    return Array(n); 
  } 

  numSequenceStart(n: number, startFrom: number): number[] {
    return [...Array(n).keys()].map(i => i + startFrom);
  }
}
