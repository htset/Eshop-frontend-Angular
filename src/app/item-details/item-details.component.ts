import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '@app/_models/item';
import { ItemService } from '@app/_services/item.service';
import { StoreService } from '@app/_services/store.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {

  item:Item = new Item(0, "", 0, "", "");

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private location: Location,
    private router: Router,
    public storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.getItem();
  }

  addToCart(): void {
    this.storeService.cart.addItem({item: this.item, quantity: 1});
    this.router.navigate(['/cart']);
  }

  getItem(): void {
    console.log("ID:" + this.route.snapshot.paramMap.get('id'));
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(id);
    if(id != 0)
    {
      this.itemService.getItem(id)
      .subscribe(item => this.item = item);   
    }
  }

  goBack(): void {
    this.location.back();
  }   


}
