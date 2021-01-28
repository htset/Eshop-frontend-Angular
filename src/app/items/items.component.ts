import { Component,OnInit } from '@angular/core';
import { Item } from '../_models/item';
import { ItemService } from '../_services/item.service';
import { StoreService } from '../_services/store.service'
import { Filter } from '../_models/filter';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  constructor(private itemService: ItemService, public storeService: StoreService) { 
    this.storeService.pageSize$
            .subscribe(newPageSize => 
              {
                console.log('new page size:' + this.storeService.pageSize);
                this.storeService.page = 1;
                this.getItems();
              })
  }

  getItems(): void {
    console.log('GetItems() --> page size: ' + this.storeService.pageSize);
    this.itemService.getItems(this.storeService.filter, this.storeService.page, this.storeService.pageSize)
                      .subscribe(itemPayload => 
                                  {
                                    this.storeService.items = itemPayload.items;
                                    this.storeService.count = itemPayload.count; 
                                  } );
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.itemService.addItem({ name } as Item)
                    .subscribe(item => {
                      this.storeService.items.push(item);
                    });
  }

  delete(item: Item): void {
    this.storeService.items = this.storeService.items.filter(h => h !== item);
    this.itemService.deleteItem(item)
                    .subscribe(item => 
                                {
                                  this.storeService.page = 1;
                                  this.getItems();
                                });
  }

  toggleFilter(): void{
    if(this.storeService.filterDisplay == "block")
      this.storeService.filterDisplay = "none";
    else
      this.storeService.filterDisplay = "block"; 
  }

  FilterChanged(filter: Filter): void {
    this.storeService.page = 1;
    this.storeService.filter = filter;
    console.log(filter);
    this.getItems();    
  }

  onPageChange(newPage: number):void {
    this.storeService.page = newPage;
    this.getItems();
  }

  ngOnInit(): void {
    this.getItems();
  }

}
