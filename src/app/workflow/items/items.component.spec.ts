import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ItemPayload } from '@app/_models/itemPayload';
import { ItemService } from '@app/_services/item.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';

import { ItemsComponent } from './items.component';

fdescribe('ItemsComponent', () => {
  let component: ItemsComponent;
  let fixture: ComponentFixture<ItemsComponent>;

  beforeEach(async () => {

    let testItems1: ItemPayload = {
      count: 14,
      items: [
        {id:1, name:"a", price:1, category:"", description:""},
        {id:2, name:"a", price:1, category:"", description:""},
        {id:3, name:"a", price:1, category:"", description:""}
      ]
    };
    let testItems2: ItemPayload = {
      count: 14,
      items: [
        {id:1, name:"a", price:1, category:"", description:""},
        {id:2, name:"a", price:1, category:"", description:""},
        {id:3, name:"a", price:1, category:"", description:""},
        {id:4, name:"a", price:1, category:"", description:""},
        {id:5, name:"a", price:1, category:"", description:""}
      ]
    };    
    const itemService = jasmine.createSpyObj('ItemService', ['getItems']);
    let getItemsSpy = itemService.getItems.and.returnValues(of(testItems1), of(testItems2));

    await TestBed.configureTestingModule({
      declarations: [ ItemsComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule, NgbModule, FormsModule ],
      providers: [{provide: ItemService, useValue: itemService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show 3 items', () => {
    let el = fixture.nativeElement.querySelectorAll('.card');
    console.log(el);
    expect(el.length).toEqual(3);
  });

  it('should show 5 items after page size change', () => {  
    const select: HTMLSelectElement = fixture.debugElement.query(By.css('#pageSize')).nativeElement;
    select.value = select.options[1].value;  // <-- select a new value
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();  
    let el = fixture.nativeElement.querySelectorAll('.card');
    console.log(el);
    expect(el.length).toEqual(5);
  });

});
