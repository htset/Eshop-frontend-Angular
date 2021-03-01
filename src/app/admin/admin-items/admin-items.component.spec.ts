import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ItemPayload } from '@app/_models/itemPayload';
import { ItemService } from '@app/_services/item.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';

import { AdminItemsComponent } from './admin-items.component';

describe('AdminItemsComponent', () => {
  let component: AdminItemsComponent;
  let fixture: ComponentFixture<AdminItemsComponent>;

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
      declarations: [ AdminItemsComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule, NgbModule, FormsModule ],
      providers: [{provide: ItemService, useValue: itemService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show 3 rows (+1 header row)', () => {
    let el = fixture.nativeElement.querySelectorAll('table tr');
    console.log(el);
    expect(el.length).toEqual(4);
  });

  it('should show 5 items after page size change', () => {  
    let el = fixture.nativeElement.querySelectorAll('table tr');
    expect(el.length).toEqual(4, 'starting with 3 items');

    const select: HTMLSelectElement = fixture.debugElement.query(By.css('#pageSize')).nativeElement;
    select.value = select.options[1].value;  // <-- select a new value
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    el = fixture.nativeElement.querySelectorAll('table tr');  
    console.log(el);
    expect(el.length).toEqual(6, 'finishing with 5 items');

    expect(component.storeService.page).toEqual(1);
  });

});

describe('AdminItemsComponent pagination', () => {
  let component: AdminItemsComponent;
  let fixture: ComponentFixture<AdminItemsComponent>;

  beforeEach(() => {

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
        {id:11, name:"b", price:1, category:"", description:""},
        {id:12, name:"b", price:1, category:"", description:""},
        {id:13, name:"b", price:1, category:"", description:""}
      ]
    };    
    let testItems3: ItemPayload = {
      count: 14,
      items: [
        {id:21, name:"c", price:1, category:"", description:""},
        {id:22, name:"c", price:1, category:"", description:""},
        {id:23, name:"c", price:1, category:"", description:""}
      ]
    };    
    const itemService = jasmine.createSpyObj('ItemService', ['getItems']);
    let getItemsSpy = itemService.getItems.and.returnValues(of(testItems1), of(testItems2), of(testItems3));

    TestBed.configureTestingModule({
      declarations: [ AdminItemsComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule, NgbModule, FormsModule ],
      providers: [{provide: ItemService, useValue: itemService}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.onPageChange(3); 
    fixture.detectChanges();
    expect(component.storeService.page).toEqual(3);

    //go to item details
    fixture.destroy();
    //return to items component - recreate component
    fixture.detectChanges();
    fixture = TestBed.createComponent(AdminItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should return to the same page after viewing item', () => { 

    expect(component.storeService.page).toEqual(3, "returning page");

  });

});


describe('AdminItemsComponent pagination 2', () => {
  let component: AdminItemsComponent;
  let fixture: ComponentFixture<AdminItemsComponent>;

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
      ]
    };    
    const itemService = jasmine.createSpyObj('ItemService', ['getItems']);
    let getItemsSpy = itemService.getItems.and.returnValues(of(testItems1), of(testItems2));

    await TestBed.configureTestingModule({
      declarations: [ AdminItemsComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule, NgbModule, FormsModule ],
      providers: [{provide: ItemService, useValue: itemService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('pagination element should change after page size select change ', () => { 
    let compiled: HTMLElement = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('ngb-pagination')).not.toBeNull();
    
    let el:HTMLElement = <HTMLElement>compiled.querySelector('ngb-pagination');
    let pageNumbers = el.querySelectorAll('li');
    //let pageNumbers = compiled.querySelectorAll('ngb-pagination > li');

    expect(pageNumbers.length).toEqual(7);
    fixture.detectChanges();

    const select: HTMLSelectElement = fixture.debugElement.query(By.css('#pageSize')).nativeElement;
    select.value = select.options[2].value;  // <-- select a new value
    console.log("size:" + select.value);
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    pageNumbers = el.querySelectorAll('li');
    expect(pageNumbers.length).toEqual(4);
  });

});

describe('AdminItemsComponent delete item', () => {
  let component: AdminItemsComponent;
  let fixture: ComponentFixture<AdminItemsComponent>;

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
        {id:7, name:"ba", price:1, category:"", description:""},
        {id:8, name:"ca", price:1, category:"", description:""},
        {id:9, name:"da", price:1, category:"", description:""},
      ]
    };  
    let testItems3: ItemPayload = {
      count: 14,
      items: [
        {id:1, name:"a", price:1, category:"", description:""},
        {id:2, name:"a", price:1, category:"", description:""},
        {id:3, name:"a", price:1, category:"", description:""},
      ]
    }; 
    
    let itemToDelete = {id:8, name:"ca", price:1, category:"", description:""};

    const itemService = jasmine.createSpyObj('ItemService', ['getItems', 'deleteItem']);
    let getItemsSpy = itemService.getItems.and.returnValues(of(testItems1), of(testItems2), of(testItems3));
    let deleteItemSpy = itemService.deleteItem.and.returnValue(of(itemToDelete));

    await TestBed.configureTestingModule({
      declarations: [ AdminItemsComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule, NgbModule, FormsModule ],
      providers: [{provide: ItemService, useValue: itemService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should return to page 1 after delete ', () => { 

    component.storeService.page = 3;
    fixture.detectChanges();

    component.delete({id:8, name:"ca", price:1, category:"", description:""});

    expect(component.storeService.page).toEqual(1);
  });

});

