import { Injectable } from '@angular/core';
import { Item } from '../_models/item';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {Filter} from '../_models/filter';
import { ItemPayload } from '../_models/itemPayload';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  itemsUrl = `${environment.apiUrl}/items`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getItems(filter:Filter, page:number, pageSize:number): Observable<ItemPayload>{
    let categoriesString:string = "";
    filter.categories.forEach(cc => categoriesString = categoriesString  + cc + "#");
    if(categoriesString.length > 0)
    categoriesString = categoriesString.substring(0, categoriesString.length -1);

    let params = new HttpParams()
              .set("name", filter.name)
              .set("pageNumber", page.toString())
              .set("pageSize", pageSize.toString())
              .set("category", categoriesString);

    return this.http.get<ItemPayload>(this.itemsUrl, {params: params})
              .pipe(catchError(this.handleError<ItemPayload>('getItems', new ItemPayload([], 0))));
  }

  getItem(id: number): Observable<Item> {
    const url = `${this.itemsUrl}/${id}`;
    return this.http.get<Item>(url)
              .pipe(catchError(this.handleError<Item>(`getItem/${id}`, new Item(0, "", 0, "", ""))));
  }
    
  updateItem(item: Item): Observable<Item> {
    const id = item.id;
    const url = `${this.itemsUrl}/${id}`;
    
    return this.http.put<Item>(url, item, this.httpOptions)
              .pipe(catchError(this.handleError<Item>(`updateItem/${id}`, item)));
  }

  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.itemsUrl, item, this.httpOptions)
              .pipe(catchError(this.handleError<Item>('addItem', item)));
  }

  deleteItem(item: Item | number): Observable<Item> {
    const id = typeof item === 'number' ? item : item.id;
    const url = `${this.itemsUrl}/${id}`;

    return this.http.delete<Item>(url, this.httpOptions)
              .pipe(catchError(this.handleError<Item>(`deleteItem/${id}`)));
  }  
  
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any) : Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }

}
