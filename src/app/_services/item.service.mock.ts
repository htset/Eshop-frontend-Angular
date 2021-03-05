import { Item } from '@app/_models/item';
import { of } from 'rxjs';

export class ItemServiceStub {
  getItems() {
    return of({
        count: 14,
        items: [
          {id:1, name:"a", price:1, category:"", description:""},
          {id:2, name:"a", price:1, category:"", description:""},
          {id:3, name:"a", price:1, category:"", description:""},
        ]
      });
  }

  getItem(id:number){
    return of( {id:1, name:"aa", price:1, category:"shoes", description:"bb"});
  }

  updateItem(item:Item) {
      return of(item);
  }

  addItem(item:Item) {
    return of(item);    
  }

}