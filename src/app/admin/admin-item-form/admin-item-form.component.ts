import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Item } from '../../_models/item';
import { ItemService } from '../../_services/item.service';

@Component({
  selector: 'app-admin-item-form',
  templateUrl: './admin-item-form.component.html',
  styleUrls: ['./admin-item-form.component.css']
})
export class AdminItemFormComponent implements OnInit {

  categories: string[] = ["", "shoes", "clothes", "glasses"];
  mode:string = "new";
  item:Item = new Item(0, "", 0, "", "");

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getItem();
  }

  get diagnostic() { return JSON.stringify(this.item); }

  onSubmit(): void {
    if(this.mode == "existing"){
      this.itemService.updateItem(this.item)
        .subscribe(() => this.router.navigate(['/admin/items']));
//        .subscribe(() => this.goBack());
    }
    else{
      this.itemService.addItem(this.item)
        .subscribe(() => this.router.navigate(['/admin/items']));
//        .subscribe(() => this.goBack());
    }
  }

  getItem(): void {
    console.log("ID:" + this.route.snapshot.paramMap.get('id'));
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(id);
    if(id != 0)
    {
      this.mode = "existing";
      this.itemService.getItem(id)
      .subscribe(item => this.item = item);   
    }
  }

  goBack(): void {
    this.location.back();
  }   

}
