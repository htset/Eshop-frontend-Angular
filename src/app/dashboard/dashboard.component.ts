import { Component, OnInit } from '@angular/core';
import { Item } from '../item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  itemService: ItemService;
  items: Item[] = []; 

  constructor(private itServ: ItemService) { 
    this.itemService = itServ;
  }

  getItems(): void {
//    this.itemService.getItems("", 1, 3).subscribe(items => this.items = items.sort((a,b)=>(a.price<b.price)?1:0).slice(1,5));
  }

  ngOnInit(): void {
    this.getItems();
  }

}
