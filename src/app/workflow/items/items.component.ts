import { Component,OnInit } from '@angular/core';
import { Item } from '../../_models/item';
import { ItemService } from '../../_services/item.service';
import { StoreService } from '../../_services/store.service'
import { AuthenticationService } from '@app/_services/authentication.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FilterComponent } from '@app/shared/filter/filter.component';
import { LoadingDialogService } from '@app/_services/loading-dialog.service';
import { skip } from 'rxjs/operators';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  loading=false;

  constructor(
    private itemService: ItemService, 
    public storeService: StoreService, 
    public authenticationService: AuthenticationService,
    public router: Router,
    private modalService: NgbModal,
    private loadingDialogService: LoadingDialogService) {  }

  getItems(): void {
    console.log('GetItems() --> page size: ' + this.storeService.pageSize);
    //this.loadingDialogService.openDialog();
    this.storeService.loading = true;
    this.itemService.getItems(this.storeService.filter, this.storeService.page, this.storeService.pageSize)
      .subscribe(itemPayload => {
        this.storeService.items = itemPayload.items;
        this.storeService.count = itemPayload.count; 
        console.log(itemPayload.items.length);
        // this.loadingDialogService.hideDialog();
        this.storeService.loading=false;
      });
  }

  openFilter(): void{
    this.modalService.open(FilterComponent);
  }

  onPageChange(newPage: number): void {
    this.storeService.page = newPage;
    this.getItems();
  }

  onPageSizeChange(): void{
    this.storeService._pageSizeSubject.next(this.storeService.pageSize);
  }

  addToCart(item:Item): void {
    //default quantity = 1
    this.storeService.cart.addItem({item: item, quantity: 1});
    this.router.navigate(['/cart']);
  }

  ngOnInit(): void {
    console.log("ngOnInit");

    this.storeService.pageSizeChanges$
      .subscribe(newPageSize => {
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
