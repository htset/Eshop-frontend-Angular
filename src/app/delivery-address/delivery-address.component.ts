import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from '@app/_models/address';
import { AuthenticationService } from '@app/_services/authentication.service';
import { UserService } from '@app/_services/user.service';


@Component({
  selector: 'app-delivery-address',
  templateUrl: './delivery-address.component.html',
  styleUrls: ['./delivery-address.component.css']
})
export class DeliveryAddressComponent implements OnInit {

  @Input('address') address?:Address;
  @Output() addressChangedEvent = new EventEmitter<Address>();

  addressForm = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    zip: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    id: new FormControl(''),
    userId: new FormControl('')
  });
  
  constructor(private authenticationService: AuthenticationService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.addressForm.controls.firstname.setValue(this?.address?.firstName);
    this.addressForm.controls.lastname.setValue(this?.address?.lastName);
    this.addressForm.controls.street.setValue(this?.address?.street);
    this.addressForm.controls.zip.setValue(this?.address?.zip);
    this.addressForm.controls.city.setValue(this?.address?.city);
    this.addressForm.controls.country.setValue(this?.address?.country);
    this.addressForm.controls.id.setValue(this?.address?.id);
    this.addressForm.controls.userId.setValue(this?.address?.userId);
  }

  onSubmit(){
    console.warn(this.addressForm.value);
    console.info(this.authenticationService.currentUserValue);
    if(this?.authenticationService?.currentUserValue?.id || 0 > 0){
      this.userService.saveAddress({...this.addressForm.value, ...{userId: this?.authenticationService?.currentUserValue?.id}})
          .subscribe((addr: Address) => {
            console.log(addr);
            //notify parent component
            this.addressChangedEvent.emit(addr);

            //reset form
            this.addressForm.reset();
          })
    }    
  }
}
