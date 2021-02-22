import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ItemPayload } from '@app/_models/itemPayload';
import { ItemService } from '@app/_services/item.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';

import { ItemsComponent } from './items.component';

describe('ItemsComponent', () => {
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
    let el = fixture.nativeElement.querySelectorAll('.card');
    expect(el.length).toEqual(3, 'starting with 3 items');

    const select: HTMLSelectElement = fixture.debugElement.query(By.css('#pageSize')).nativeElement;
    select.value = select.options[1].value;  // <-- select a new value
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    el = fixture.nativeElement.querySelectorAll('.card');  
    console.log(el);
    expect(el.length).toEqual(5, 'finishing with 5 items');

    expect(component.storeService.page).toEqual(1);
  });

});

describe('ItemsComponent pagination', () => {
  let component: ItemsComponent;
  let fixture: ComponentFixture<ItemsComponent>;

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
      declarations: [ ItemsComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule, NgbModule, FormsModule ],
      providers: [{provide: ItemService, useValue: itemService}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.onPageChange(3); 
    fixture.detectChanges();
    expect(component.storeService.page).toEqual(3);

    //go to item details
    fixture.destroy();
    //return to items component - recreate component
    fixture.detectChanges();
    fixture = TestBed.createComponent(ItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should return to the same page after viewing item', () => { 

    expect(component.storeService.page).toEqual(3, "returning page");

  });

});


describe('ItemsComponent pagination 2', () => {
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
