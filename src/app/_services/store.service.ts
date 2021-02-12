import { Injectable } from '@angular/core';
import { Address } from '@app/_models/address';
import { Cart } from '@app/_models/cart';
import { Order } from '@app/_models/order';
import { BehaviorSubject, Subject } from 'rxjs';
import { Filter } from '../_models/filter';
import { Item } from '../_models/item';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private readonly _items = new BehaviorSubject<Item[]>([]);
  readonly items$ = this._items.asObservable(); 
  
  get items(): Item[] {
    return this._items.getValue();
  }

  set items(val: Item[]) {
    this._items.next(val);
  }

  private readonly _filter = new BehaviorSubject<Filter>(new Filter("", []));
  readonly filter$ = this._filter.asObservable(); 
  
  get filter(): Filter {
    return this._filter.getValue();
  }

  set filter(val: Filter) {
    this._filter.next(val);
  }

  private readonly _page = new BehaviorSubject<number>(1);
  readonly page$ = this._page.asObservable(); 
      
  get page(): number {
    return this._page.getValue();
  }

  set page(val: number) {
    this._page.next(val);
  }
/*
  private readonly _pageSize = new BehaviorSubject<number>(3);
  public pageSize$ = this._pageSize.asObservable(); 
      
  get pageSize(): number {
    return this._pageSize.getValue();
  }

  set pageSize(val: number) {
    this._pageSize.next(val);
  }
*/
  public pageSize: number = 3;
  public readonly _pageSizeSubject = new Subject<number>();
  public pageSizeChanges$ = this._pageSizeSubject.asObservable(); 
      
/*  get pageSize(): number {
    return this._pageSize;
  }
*/
/*  set pageSize(val: number) {
    this._pageSize = val;
    this._pageSizeSubject.next(val);
  }
*/
  private readonly _count = new BehaviorSubject<number>(1);
  readonly count$ = this._count.asObservable(); 
      
  get count(): number {
    return this._count.getValue();
  }

  set count(val: number) {
    this._count.next(val);
  }

  private readonly _filterDisplay = new BehaviorSubject<boolean>(false);
  readonly filterDisplay$ = this._filterDisplay.asObservable(); 
  
  get filterDisplay(): boolean {
    return this._filterDisplay.getValue();
  }

  set filterDisplay(val: boolean) {
    this._filterDisplay.next(val);
  }

  private readonly _cart = new BehaviorSubject<Cart>(new Cart());
  readonly cart$ = this._cart.asObservable(); 
  
  get cart(): Cart {
    return this._cart.getValue();
  }

  set cart(val: Cart) {
    this._cart.next(val);
  }

  private readonly _deliveryAddress = new BehaviorSubject<number>(-1);
  readonly deliveryAddress$ = this._deliveryAddress.asObservable(); 
  
  get deliveryAddress(): number {
    return this._deliveryAddress.getValue();
  }

  set deliveryAddress(val: number) {
    this._deliveryAddress.next(val);
  }  

  private readonly _order = new BehaviorSubject<Order>(new Order());
  readonly order$ = this._order.asObservable(); 
  
  get order(): Order {
    return this._order.getValue();
  }

  set order(val: Order) {
    this._order.next(val);
  }  

  private readonly _loading = new BehaviorSubject<boolean>(false);
  readonly loading$ = this._loading.asObservable(); 
  
  get loading(): boolean {
    return this._loading.getValue();
  }

  set loading(val: boolean) {
    this._loading.next(val);
  }  

  constructor() { }

}
