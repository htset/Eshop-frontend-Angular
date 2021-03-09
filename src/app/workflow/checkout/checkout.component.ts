import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
                  public userService: UserService,
                  public router: Router ) { }

  ngOnInit(): void {
    console.info(this.authenticationService.currentUserValue);
    if(this?.authenticationService?.currentUserValue?.id || 0 > 0){
      this.userService.getAddressByUserId(this?.authenticationService?.currentUserValue?.id || 0)
          .subscribe(addresses => {
            this.addressList = addresses;
            this.addressId = this.storeService.deliveryAddress;
            console.log(this.addressList);
          })
    }
  }

  addressChanged(addr:Address):void{
    console.log('address changed');
    //update address list
    if(this?.authenticationService?.currentUserValue?.id || 0 > 0){
      this.userService.getAddressByUserId(this?.authenticationService?.currentUserValue?.id || 0)
          .subscribe(addresses => {
            console.log('address changed subscribe');
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

            if(this.addressId == addressId)
              this.addressId = -1;
          })
    }
  } 
  
  onSubmit():void{
    console.log('on submit');
    this.storeService.deliveryAddress = this.addressId;
    this.router.navigate(['/payment']);
  }
}
