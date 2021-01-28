import { Injectable } from '@angular/core';
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

  private readonly _filterDisplay = new BehaviorSubject<string>("none");
  readonly filterDisplay$ = this._filterDisplay.asObservable(); 
  
  get filterDisplay(): string {
    return this._filterDisplay.getValue();
  }

  set filterDisplay(val: string) {
    this._filterDisplay.next(val);
  }
  constructor() { }

}
