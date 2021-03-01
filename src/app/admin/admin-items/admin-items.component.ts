import { Component, OnInit } from '@angular/core';
import { Item } from '../../_models/item';
import { ItemService } from '../../_services/item.service';
import { StoreService } from '../../_services/store.service'
import { AuthenticationService } from '@app/_services/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FilterComponent } from '@app/shared/filter/filter.component';
import { skip } from 'rxjs/operators';

@Component({
  selector: 'app-admin-items',
  templateUrl: './admin-items.component.html',
  styleUrls: ['./admin-items.component.css']
})
export class AdminItemsComponent implements OnInit {

  constructor(private itemService: ItemService, 
    public storeService: StoreService, 
    public authenticationService: AuthenticationService,
    private modalService: NgbModal) { }

  getItems(): void {
    console.log('GetItems() --> page size: ' + this.storeService.pageSize);
    this.storeService.loading = true;
    this.itemService.getItems(this.storeService.filter, this.storeService.page, this.storeService.pageSize)
      .subscribe(itemPayload => {
        this.storeService.items = itemPayload.items;
        this.storeService.count = itemPayload.count; 
        this.storeService.loading = false;
      });
  }

  delete(item: Item): void {
    this.itemService.deleteItem(item)
      .subscribe(item => {
        this.storeService.page = 1;
        this.getItems();
      });
  }

  openFilter(){
    this.modalService.open(FilterComponent);
  }

  onPageChange(newPage: number):void {
    this.storeService.page = newPage;
    this.getItems();
  }

  onPageSizeChange():void{
    this.storeService._pageSizeSubject.next(this.storeService.pageSize);
  }

  ngOnInit(): void {
    this.storeService.pageSizeChanges$
      .subscribe(newPageSize => 
        {
          console.log('new page size:' + this.storeService.pageSize);
          this.storeService.page = 1;
          this.getItems();
        });
      
    this.storeService.filter$
      .pipe(skip(1))    //skip getting filter at component creation
      .subscribe(newFilter => {
          this.storeService.page = 1;
          this.getItems();          
        });  
        
    this.getItems();
  }

}
