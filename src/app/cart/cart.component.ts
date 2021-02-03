import { Component, OnInit } from '@angular/core';
import { CartItem } from '@app/_models/cartItem';
import { Item } from '@app/_models/item';
import { StoreService } from '@app/_services/store.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(public storeService: StoreService) { }
 
  removeFromCart(item: CartItem){
    this.storeService.cart.removeItem(item);
  }
 
  emptyCart(){
    this.storeService.cart.emptyCart();
  }
  
  ngOnInit(): void {
  }

}
