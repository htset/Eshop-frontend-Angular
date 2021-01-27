import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Item } from '../_models/item';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const items = [
      {
          id: 1,    
          name: "aaaa",
          price: 12.75,
          category: "shoes"
      },
      {
          id: 2,    
          name: "bbbb",
          price: 11.15,
          category: "shoes"
      },   
      {
          id: 3,    
          name: "cccc",
          price: 7.55,
          category: "clothes"
      },   
      {
          id: 4,    
          name: "dddd",
          price: 1.05,
          category: "shoes"
      }, 
      {
          id: 5,    
          name: "eeee",
          price: 21.05,
          category: "clothes"
      } ,   
      {
          id: 6,    
          name: "ffff",
          price: 11,
          category: "shoes"
      },    
      {
          id: 7,    
          name: "gggg",
          price: 6.23,
          category: "shoes"
      }    
  ] ;
    return {items};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(items: Item[]): number {
    return items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
  }
}