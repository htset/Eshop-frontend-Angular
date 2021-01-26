import { Injectable } from '@angular/core';
import { Item } from './item';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {Filter} from './filter';
import { ItemPayload } from './ItemPayload';
@Injectable({
  providedIn: 'root'
})
export class ItemService {

//  private itemsUrl = 'https://localhost:44326/api/items/';  // URL to web api
  private itemsUrl = 'api/items';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getItems(filter:Filter, page:number, pageSize:number): Observable<ItemPayload>{
    let categoriesString:string = "";
    filter.categories.forEach(cc => categoriesString = categoriesString  + cc + "#");
    if(categoriesString.length > 0)
    categoriesString = categoriesString.substring(0, categoriesString.length -1);

    console.log(categoriesString);

    let params = new HttpParams()
              .set("name", filter.name)
              .set("pageNumber", page.toString())
              .set("pageSize", pageSize.toString())
              .set("category", categoriesString);

    return this.http.get<ItemPayload>(this.itemsUrl, {params: params})
              .pipe(catchError(this.handleError<ItemPayload>('getItems')));
  }

  getItem(id: number): Observable<Item> {
    const url = `${this.itemsUrl}/${id}`;
    return this.http.get<Item>(url)
              .pipe(catchError(this.handleError<Item>(`getItem/${id}`)));
  }
    
  updateItem(item: Item): Observable<any> {
    const id = typeof item === 'number' ? item : item.id;
    const url = `${this.itemsUrl}/${id}`;
    
    return this.http.put(url, item, this.httpOptions)
      .pipe(catchError(this.handleError<any>('updateItem')));
  }

  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.itemsUrl, item, this.httpOptions).pipe(
      catchError(this.handleError<Item>('addItem'))
    );
  }

  deleteItem(item: Item | number): Observable<Item> {
    const id = typeof item === 'number' ? item : item.id;
    const url = `${this.itemsUrl}/${id}`;

    return this.http.delete<Item>(url, this.httpOptions).pipe(
      catchError(this.handleError<Item>('deleteItem'))
    );
  }  
  
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any) : Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }

  constructor(private http: HttpClient) { }
}
