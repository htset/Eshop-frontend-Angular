import { Component, OnInit } from '@angular/core';
import { Address } from '@app/_models/address';
import { AuthenticationService } from '@app/_services/authentication.service';
import { StoreService } from '@app/_services/store.service';
import { UserService } from '@app/_services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  addressId: number = -1;
  public addressIdForModification: number = -1;
  addressList?:Address[];
  vv:string = "";
  constructor(public storeService: StoreService,
                  public authenticationService: AuthenticationService,
                  public userService: UserService ) { }

  ngOnInit(): void {
    console.info(this.authenticationService.currentUserValue);
    if(this?.authenticationService?.currentUserValue?.id || 0 > 0){
      this.userService.getAddressByUserId(this?.authenticationService?.currentUserValue?.id || 0)
          .subscribe(addresses => {
            this.addressList = addresses;
          })
    }
  }

  addressChanged(addr:Address):void{
    //update address list
    if(this?.authenticationService?.currentUserValue?.id || 0 > 0){
      this.userService.getAddressByUserId(this?.authenticationService?.currentUserValue?.id || 0)
          .subscribe(addresses => {
            this.addressList = addresses;
            //change selected checkbox
            this.addressId = addr.id || 0;
            //toggle modifying
            this.addressIdForModification = -1;
          })
    }
  }

  modifyAddress(addr:Address):void{
    this.addressIdForModification = addr.id || -1;
  }

  cancelModifyAddress():void{
    this.addressIdForModification = -1;  
  }

  deleteAddress(addr:Address):void{
    if(this?.authenticationService?.currentUserValue?.id || 0 > 0){
      this.userService.deleteAddress(addr.id)
          .subscribe(addressId => {
            this.addressList = this.addressList?.filter(addr => addr.id != addressId);
          })
    }
  }  
}
