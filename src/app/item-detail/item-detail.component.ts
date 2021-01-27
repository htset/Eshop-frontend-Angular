import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Item } from '../_models/item';
import { ItemService } from '../_services/item.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  @Input() item: Item = {id:0, name:"", price:0, category: "other"};
  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getItem();
  }

  getItem(): void {
    console.log("ID:" + this.route.snapshot.paramMap.get('id'));
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.itemService.getItem(id)
      .subscribe(item => this.item = item);   
  }

  goBack(): void {
    this.location.back();
  } 
  
  save(): void {
    this.itemService.updateItem(this.item)
      .subscribe(() => this.goBack());
  }


}
