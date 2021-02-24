import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CartItem } from '@app/_models/cartItem';
import { Item } from '@app/_models/item';


import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartComponent ],
      imports: [HttpClientTestingModule, FormsModule] //---> !!!!!! Need FormsModule for ngModel to work !!!!!!!
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update item quantity',  fakeAsync( () => {
    component.storeService.cart.addItem({quantity:1, item: new Item(1,"aa", 10, "shoes", "")} as CartItem);
    tick();
    fixture.detectChanges();

    let quantityTextBox: HTMLInputElement = fixture.debugElement.query(By.css('#quantity')).nativeElement;
    quantityTextBox.value = "3";
    quantityTextBox.dispatchEvent(new Event('input'));

    tick();
    fixture.detectChanges();

    console.log(component.storeService.cart);
    expect(component.storeService.cart.cartItems[0].quantity).toEqual(3);
  }));

  it('should delete item',  fakeAsync( () => {
    component.storeService.cart.addItem({quantity:1, item: new Item(1,"aa", 10, "shoes", "")} as CartItem);
    tick();
    fixture.detectChanges();
    expect(component.storeService.cart.cartItems.length).toEqual(1);

    //alternative way to get element (by text)
    let removeButton: HTMLInputElement = fixture.debugElement.query(By.css('input[value="Remove"]')).nativeElement;
    removeButton.dispatchEvent(new Event('click'));

    tick();
    fixture.detectChanges();

    console.log(component.storeService.cart);
    expect(component.storeService.cart.cartItems.length).toEqual(0);
  }));  
});
