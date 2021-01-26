import { Component,OnInit } from '@angular/core';
import { Item } from '../item';
import { ItemService } from '../item.service';
import { StoreService } from '../store.service'
import { Filter } from '../filter';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  itemService: ItemService;
  items: Item[] = []; 
  page:number = 1;
  pageSize:number = 3;
  filter: Filter = {name: "", categories:[]};
  filterDisplay:string = "none";
  count: number = 0;

  constructor(private itServ: ItemService, public storeService: StoreService) { 
    this.itemService = itServ;
  }

  getItems(): void {
    this.itemService.getItems(this.filter, this.page, this.pageSize)
      .subscribe(itemPayload => 
                  {
                    this.items = itemPayload.items; 
                    this.storeService.items = this.items;
                    this.count = itemPayload.count; 
                    this.storeService.count = this.count; 
                   } );
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.itemService.addItem({ name } as Item)
      .subscribe(item => {
        this.items.push(item);
        this.storeService.items = this.items;
      });
  }

  delete(item: Item): void {
    this.items = this.items.filter(h => h !== item);
    this.itemService.deleteItem(item).subscribe(item => {this.storeService.items = this.items;});
  }

  toggleFilter(): void{
    if(this.filterDisplay == "block")
      this.filterDisplay = "none";
    else
      this.filterDisplay = "block"; 
  }

  FilterChanged(filter: Filter): void {
    this.page = 1;
    this.storeService.page = this.page;
    this.filter = filter;
    console.log(filter);
    this.getItems();    
  }

  onPageChange(newPage: number):void {
    this.page = newPage;
    this.getItems();
  }

  ngOnInit(): void {
    this.page = this.storeService.page;

    if(this.storeService.items.length == 0)
      this.getItems();
    else
     this.items = this.storeService.items;
  }

}
