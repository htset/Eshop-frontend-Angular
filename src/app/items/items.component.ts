import { Component,OnInit } from '@angular/core';
import { Item } from '../_models/item';
import { ItemService } from '../_services/item.service';
import { StoreService } from '../_services/store.service'
import { Filter } from '../_models/filter';
import { AuthenticationService } from '@app/_services/authentication.service';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FilterComponent } from '@app/filter/filter.component';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  closeResult = '';

  constructor(private itemService: ItemService, 
              public storeService: StoreService, 
              public authenticationService: AuthenticationService,
              public router: Router,
              private modalService: NgbModal) { 
        this.storeService.pageSizeChanges$
            .subscribe(newPageSize => 
              {
                console.log('new page size:' + this.storeService.pageSize);
                this.storeService.page = 1;
                this.getItems();
              });
              
        this.storeService.filter$
            .subscribe(newFilter => {
              this.storeService.page = 1;
              this.getItems();          
            });
              
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
    this.storeService.filterDisplay = ! this.storeService.filterDisplay;
  }

  openFilter(){
    this.modalService.open(FilterComponent);
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

  onPageSizeChange():void{
    this.storeService._pageSizeSubject.next(this.storeService.pageSize);
  }

  addToCart(item:Item): void {
    this.storeService.cart.addItem({item: item, quantity: 1});
    this.router.navigate(['/cart']);
  }

  ngOnInit(): void {
    this.getItems();
  }

}
