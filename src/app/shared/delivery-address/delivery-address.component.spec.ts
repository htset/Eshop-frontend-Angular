import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Address } from '@app/_models/address';
import { of } from 'rxjs';

import { DeliveryAddressComponent } from './delivery-address.component';

let testAddress = {id: 1, userId: 1, firstName: "tt", lastName: 'gg', street: 'ss 12', zip: '11223', city: 'athens', country: 'GR'};

//Wrapper component
//https://stackoverflow.com/questions/36654834/angular2-unit-test-with-input


@Component({
  selector  : 'test-component-wrapper',
  template  : '<app-delivery-address [address]="mockAddress" (addressChangedEvent)="mockAddressChanged($event)"></app-delivery-address>'
 })
 class TestComponentWrapper { 
    mockAddress?:Address; //mock your input 

    mockAddressChanged(addr: Address) {
      console.log('mockAddressChanged called');
    }
 }
 
describe('DeliveryAddressComponent', () => {
  let component: DeliveryAddressComponent;
  let fixture: ComponentFixture<TestComponentWrapper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        TestComponentWrapper,
        DeliveryAddressComponent 
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponentWrapper);
    component = fixture.debugElement.children[0].componentInstance; //We get the first (and only) child
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validates form correctly (empty address)', fakeAsync(() => {

    expect(fixture.debugElement.query(By.css('button')).nativeElement.disabled).toBeTruthy();

    let form = component.addressForm.controls;

    expect(form.firstname.valid).toBe(false);
    form.firstname.setValue('aa');
    expect(form.firstname.valid).toBe(true);

    expect(component.addressForm.valid).toBe(false);

    expect(form.lastname.valid).toBe(false);
    form.lastname.setValue('bb');
    expect(form.lastname.valid).toBe(true);

    expect(component.addressForm.valid).toBe(false);

    expect(form.street.valid).toBe(false);
    form.street.setValue('ermou');
    expect(form.street.valid).toBe(true);

    expect(component.addressForm.valid).toBe(false);

    expect(form.zip.valid).toBe(false);
    form.zip.setValue('1a3');
    expect(form.zip.valid).toBe(true);

    expect(component.addressForm.valid).toBe(false);

    expect(form.city.valid).toBe(false);
    form.city.setValue('athens');
    expect(form.city.valid).toBe(true);

    expect(component.addressForm.valid).toBe(false);

    expect(form.country.valid).toBe(false);
    form.country.setValue('GR');
    expect(form.country.valid).toBe(true);

    expect(form.id.valid).toBe(true);
    expect(form.userId.valid).toBe(true);
    expect(form.id.value).toBeUndefined();
    expect(form.userId.value).toBeUndefined();

    expect(component.addressForm.valid).toBe(true);

    fixture.detectChanges();
    tick();
    let submitButton = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(submitButton.disabled).toBeFalsy();

  }));

  it('validates form correctly (existing address)', fakeAsync(() => {
  
    fixture.componentInstance.mockAddress = testAddress;
    tick();
    fixture.detectChanges();    

    console.log('after setting address');
    component.ngOnInit();

    tick();
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('button')).nativeElement.disabled).toBeFalsy();

    let form = component.addressForm.controls;

    expect(form.firstname.valid).toBe(true);
    form.firstname.setValue('aa');
    expect(form.firstname.valid).toBe(true);

    expect(component.addressForm.valid).toBe(true);

    expect(form.lastname.valid).toBe(true);
    form.lastname.setValue('bb');
    expect(form.lastname.valid).toBe(true);

    expect(component.addressForm.valid).toBe(true);

    expect(form.street.valid).toBe(true);
    form.street.setValue('ermou');
    expect(form.street.valid).toBe(true);

    expect(component.addressForm.valid).toBe(true);

    expect(form.zip.valid).toBe(true);
    form.zip.setValue('1a3');
    expect(form.zip.valid).toBe(true);

    expect(component.addressForm.valid).toBe(true);

    expect(form.city.valid).toBe(true);
    form.city.setValue('athens');
    expect(form.city.valid).toBe(true);

    expect(component.addressForm.valid).toBe(true);

    expect(form.country.valid).toBe(true);
    form.country.setValue('GR');
    expect(form.country.valid).toBe(true);

    expect(form.id.valid).toBe(true);
    expect(form.userId.valid).toBe(true);
    expect(form.id.value).toEqual(1);
    expect(form.userId.value).toEqual(1);

    expect(component.addressForm.valid).toBe(true);

    fixture.detectChanges();
    tick();
    let submitButton = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(submitButton.disabled).toBeFalsy();


  }));

  it('sends data from form to view correctly', fakeAsync(() => {
    let form = component.addressForm.controls;

    form.firstname.setValue('1111222233334444');
    form.lastname.setValue('111');
    form.street.setValue('aa ff');
    form.zip.setValue('7');
    form.city.setValue('2023');
    form.country.setValue('2023');

    expect(component.addressForm.valid).toBe(true);

    fixture.detectChanges();
    tick();

    expect(fixture.debugElement.query(By.css('input[formControlName="firstname"]')).nativeElement.value).toEqual('1111222233334444');
    expect(fixture.debugElement.query(By.css('input[formControlName="lastname"]')).nativeElement.value).toEqual('111');
    expect(fixture.debugElement.query(By.css('input[formControlName="street"]')).nativeElement.value).toEqual('aa ff');
    expect(fixture.debugElement.query(By.css('input[formControlName="zip"]')).nativeElement.value).toEqual('7');
    expect(fixture.debugElement.query(By.css('input[formControlName="city"]')).nativeElement.value).toEqual('2023');
    expect(fixture.debugElement.query(By.css('input[formControlName="country"]')).nativeElement.value).toEqual('2023');

    let submitButton = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(submitButton.disabled).toBeFalsy();

  }));

  it('sends data from view to form correctly', fakeAsync(() => {
    let form = component.addressForm.controls;

    fixture.debugElement.query(By.css('input[formControlName="firstname"]')).nativeElement.value = '1111222233334444';
    fixture.debugElement.query(By.css('input[formControlName="lastname"]')).nativeElement.value = '111';
    fixture.debugElement.query(By.css('input[formControlName="street"]')).nativeElement.value = 'aa ff';
    fixture.debugElement.query(By.css('input[formControlName="zip"]')).nativeElement.value = '7';
    fixture.debugElement.query(By.css('input[formControlName="city"]')).nativeElement.value = '2023';
    fixture.debugElement.query(By.css('input[formControlName="country"]')).nativeElement.value = '2023';

    fixture.debugElement.query(By.css('input[formControlName="firstname"]')).nativeElement.dispatchEvent(new Event('input'));
    fixture.debugElement.query(By.css('input[formControlName="lastname"]')).nativeElement.dispatchEvent(new Event('input'));
    fixture.debugElement.query(By.css('input[formControlName="street"]')).nativeElement.dispatchEvent(new Event('input'));
    fixture.debugElement.query(By.css('input[formControlName="zip"]')).nativeElement.dispatchEvent(new Event('input'));
    fixture.debugElement.query(By.css('input[formControlName="city"]')).nativeElement.dispatchEvent(new Event('input'));
    fixture.debugElement.query(By.css('input[formControlName="country"]')).nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    tick();
    expect(component.addressForm.valid).toBe(true);

    expect(form.firstname.value).toEqual('1111222233334444');
    expect(form.lastname.value).toEqual('111');
    expect(form.street.value).toEqual('aa ff');
    expect(form.zip.value).toEqual('7');
    expect(form.city.value).toEqual('2023');
    expect(form.country.value).toEqual('2023');

    let submitButton = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(submitButton.disabled).toBeFalsy();


  }));

  it('saves address', fakeAsync(() => {
  
    fixture.componentInstance.mockAddress = testAddress;
    tick();
    fixture.detectChanges();    

    console.log('after setting address');
    component.ngOnInit();

    tick();
    fixture.detectChanges();

    spyOn(fixture.componentInstance, 'mockAddressChanged').and.callThrough();
    spyOn(component.userService, 'saveAddress').and.returnValue(of(testAddress));
    component.authenticationService.currentUserValue.id = 1;

    let el:HTMLButtonElement = fixture.debugElement.children[0].query(By.css('button')).nativeElement;
    el.click();

    tick();
    fixture.detectChanges();

    //form is reset
    expect(component.addressForm.valid).toBeFalse();
    expect(fixture.componentInstance.mockAddressChanged).toHaveBeenCalledWith(testAddress);

  }));

  it('saves address (starting from empty address)', fakeAsync(() => {
  
    fixture.debugElement.query(By.css('input[formControlName="firstname"]')).nativeElement.value = testAddress.firstName;
    fixture.debugElement.query(By.css('input[formControlName="lastname"]')).nativeElement.value = testAddress.lastName;
    fixture.debugElement.query(By.css('input[formControlName="street"]')).nativeElement.value = testAddress.street;
    fixture.debugElement.query(By.css('input[formControlName="zip"]')).nativeElement.value = testAddress.zip;
    fixture.debugElement.query(By.css('input[formControlName="city"]')).nativeElement.value = testAddress.city;
    fixture.debugElement.query(By.css('input[formControlName="country"]')).nativeElement.value = testAddress.country;

    fixture.debugElement.query(By.css('input[formControlName="firstname"]')).nativeElement.dispatchEvent(new Event('input'));
    fixture.debugElement.query(By.css('input[formControlName="lastname"]')).nativeElement.dispatchEvent(new Event('input'));
    fixture.debugElement.query(By.css('input[formControlName="street"]')).nativeElement.dispatchEvent(new Event('input'));
    fixture.debugElement.query(By.css('input[formControlName="zip"]')).nativeElement.dispatchEvent(new Event('input'));
    fixture.debugElement.query(By.css('input[formControlName="city"]')).nativeElement.dispatchEvent(new Event('input'));
    fixture.debugElement.query(By.css('input[formControlName="country"]')).nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    tick();
    expect(component.addressForm.valid).toBe(true);

    spyOn(fixture.componentInstance, 'mockAddressChanged').and.callThrough();
    spyOn(component.userService, 'saveAddress').and.returnValue(of(testAddress));
    component.authenticationService.currentUserValue.id = 1;

    let el:HTMLButtonElement = fixture.debugElement.children[0].query(By.css('button')).nativeElement;
    el.click();

    tick();
    fixture.detectChanges();

    //form is reset
    expect(component.addressForm.valid).toBeFalse();
    expect(fixture.componentInstance.mockAddressChanged).toHaveBeenCalledWith(testAddress);

  }));

});
