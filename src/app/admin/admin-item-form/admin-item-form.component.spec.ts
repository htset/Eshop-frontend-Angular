import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, ActivatedRouteSnapshot, convertToParamMap, ParamMap, Params, Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NotFoundComponent } from '@app/not-found/not-found.component';
import { Item } from '@app/_models/item';
import { ItemService } from '@app/_services/item.service';
import { ItemServiceStub } from '@app/_services/item.service.mock';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { asapScheduler, Observable, of, ReplaySubject, throwError } from 'rxjs';
import { observeOn } from 'rxjs/operators';

import { AdminItemFormComponent } from './admin-item-form.component';

class ActivatedRouteStub implements Partial<ActivatedRoute> {
  private _paramMap?: ParamMap;
  private subject = new ReplaySubject<ParamMap>();

  paramMap = this.subject.asObservable();
  get snapshot(): ActivatedRouteSnapshot {
    const snapshot: Partial<ActivatedRouteSnapshot> = {
      paramMap: this._paramMap,
    };

    return snapshot as ActivatedRouteSnapshot;
  }

  constructor(initialParams?: Params) {
    if(initialParams !== undefined)
      this.setParamMap(initialParams);
  }

  setParamMap(params: Params) {
    const paramMap = convertToParamMap(params);
    this._paramMap = paramMap;
    this.subject.next(paramMap);
  }
}

describe('AdminItemFormComponent', () => {
  let component: AdminItemFormComponent;
  let fixture: ComponentFixture<AdminItemFormComponent>;
  let router: Router;
  let route: ActivatedRoute;

  beforeEach(async () => {

    let testItem = {id:1, name:"aa", price:1, category:"", description:""};
    const itemService = jasmine.createSpyObj('ItemService', ['getItem']);
    let getItemsSpy = itemService.getItem.and.returnValue(of(testItem));

    await TestBed.configureTestingModule({
      declarations: [ AdminItemFormComponent],
      imports: [ HttpClientTestingModule, RouterTestingModule, FormsModule ],
      providers: [{ provide: ItemService, useValue: itemService}]
    })
    .compileComponents();
  });

  it('should display selected item', fakeAsync( () => {
    route = TestBed.inject(ActivatedRoute);
    const spyRoute = spyOn(route.snapshot.paramMap, 'get');
    spyRoute.and.returnValue('1'); //itemID = 1

    fixture = TestBed.createComponent(AdminItemFormComponent);
    component = fixture.componentInstance;

    expect(component).toBeTruthy();

    tick();
    fixture.detectChanges();
    expect(component.item.name).toEqual('aa');

    tick();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    console.log((<HTMLInputElement>fixture.debugElement.query(By.css('#id')).nativeElement).value);
    expect((<HTMLInputElement>fixture.debugElement.query(By.css('#id')).nativeElement).value).toEqual('1');
    expect((<HTMLInputElement>fixture.debugElement.query(By.css('#name')).nativeElement).value).toEqual('aa');

  }));

});

describe('AdminItemFormComponent', () => {
  let component: AdminItemFormComponent;
  let fixture: ComponentFixture<AdminItemFormComponent>;
  let router: Router;
  let route: ActivatedRoute;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ AdminItemFormComponent],
      imports: [ 
        HttpClientTestingModule, 
        RouterTestingModule.withRoutes([]), 
        FormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    route = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
  });

  it('should display 404 page when passed non-integer ItemID', fakeAsync( () => {
    const spyRoute = spyOn(route.snapshot.paramMap, 'get');
    spyRoute.and.returnValue('1aa');
    
    const navigateSpy = spyOn(router, 'navigate');

    fixture = TestBed.createComponent(AdminItemFormComponent);
    component = fixture.componentInstance;
    
    tick();
    fixture.detectChanges();

    expect(navigateSpy).toHaveBeenCalledWith(['/404']);
  }));

  it('should display 404 page when passed negative integer ItemID', fakeAsync( () => {
    const spyRoute = spyOn(route.snapshot.paramMap, 'get');
    spyRoute.and.returnValue('-1'); 
    
    const navigateSpy = spyOn(router, 'navigate');

    fixture = TestBed.createComponent(AdminItemFormComponent);
    component = fixture.componentInstance;
    
    tick();
    fixture.detectChanges();

    expect(navigateSpy).toHaveBeenCalledWith(['/404']);
  }));

});

describe('AdminItemFormComponent', () => {
  let component: AdminItemFormComponent;
  let fixture: ComponentFixture<AdminItemFormComponent>;
  let router: Router;
  let route: ActivatedRoute;

  beforeEach(async () => {

    let itemServiceSpy = jasmine.createSpyObj({'getItem': throwError({status: 404})});

    await TestBed.configureTestingModule({
      declarations: [ AdminItemFormComponent],
      imports: [ 
        HttpClientTestingModule, 
        RouterTestingModule.withRoutes([]), 
        FormsModule ],
        providers: [{ provide: ItemService, useValue: itemServiceSpy }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    route = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
  });

  it('should display 404 page when passed non-existing integer ItemID - version 1', fakeAsync( () => {
    const spyRoute = spyOn(route.snapshot.paramMap, 'get');
    spyRoute.and.returnValue('100'); 
    
    const navigateSpy = spyOn(router, 'navigate');

    fixture = TestBed.createComponent(AdminItemFormComponent);
    component = fixture.componentInstance;
    
    tick();
    fixture.detectChanges();

    expect(navigateSpy).toHaveBeenCalledWith(['/404']);
  }));

});

describe('AdminItemFormComponent', () => {
  let component: AdminItemFormComponent;
  let fixture: ComponentFixture<AdminItemFormComponent>;
  let router: Router;
  let route: ActivatedRoute;

  beforeEach(async () => {

    const fakeService = {
      getItem(itemID: number): Observable<Item> {
        console.log('spy getItem called');
        return throwError({status: 404});
      },
    } as Partial<ItemService>;

    await TestBed.configureTestingModule({
      declarations: [ AdminItemFormComponent],
      imports: [ 
        HttpClientTestingModule, 
        RouterTestingModule.withRoutes([]), 
        FormsModule ],
        providers: [{ provide: ItemService, useValue: fakeService }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    route = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
  });

  it('should display 404 page when passed non-existing integer ItemID - version 2', fakeAsync( () => {
    const spyRoute = spyOn(route.snapshot.paramMap, 'get');
    spyRoute.and.returnValue('100'); 
    
    const navigateSpy = spyOn(router, 'navigate');

    fixture = TestBed.createComponent(AdminItemFormComponent);
    component = fixture.componentInstance;
    
    tick();
    fixture.detectChanges();

    expect(navigateSpy).toHaveBeenCalledWith(['/404']);
  }));

});

describe('AdminItemFormComponent', () => {
  let component: AdminItemFormComponent;
  let fixture: ComponentFixture<AdminItemFormComponent>;
  let router: Router;
  let route: ActivatedRoute;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ AdminItemFormComponent],
      imports: [ 
        HttpClientTestingModule, 
        RouterTestingModule.withRoutes([]), 
        FormsModule ],
        providers: [{ provide: ItemService }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    route = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
  });

  it('should display 404 page when passed non-existing integer ItemID - version 3', fakeAsync( () => {
    const spyRoute = spyOn(route.snapshot.paramMap, 'get');
    spyRoute.and.returnValue('100'); 
    
    const navigateSpy = spyOn(router, 'navigate');

    fixture = TestBed.createComponent(AdminItemFormComponent);
    component = fixture.componentInstance;
    
    const itemService = fixture.debugElement.injector.get(ItemService);
    spyOn(itemService, 'getItem').and.returnValue(throwError({status: 404}));

    tick();
    fixture.detectChanges();

    expect(navigateSpy).toHaveBeenCalledWith(['/404']);
  }));

});

describe('AdminItemFormComponent', () => {
  let component: AdminItemFormComponent;
  let fixture: ComponentFixture<AdminItemFormComponent>;
  let router: Router;
  let route: ActivatedRoute;
  let routeStub: ActivatedRouteStub;

  beforeEach(async () => {

    const fakeService = {
      getItem(itemID: number): Observable<Item> {
        console.log('spy getItem called');
        return throwError({status: 404});
      },
    } as Partial<ItemService>;

    routeStub = new ActivatedRouteStub();

    await TestBed.configureTestingModule({
      declarations: [ AdminItemFormComponent],
      imports: [ 
        HttpClientTestingModule, 
        RouterTestingModule.withRoutes([]), 
        FormsModule ],
        providers: [
          { provide: ItemService, useValue: fakeService },
          { provide: ActivatedRoute, useValue: routeStub }
        ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    route = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(AdminItemFormComponent);
    component = fixture.componentInstance;
  });

  it('should display 404 page when passed non-existing integer ItemID - version 4', fakeAsync( () => {
    routeStub.setParamMap({ id: 100 }); 
    const navigateSpy = spyOn(router, 'navigate');
    
    tick();
    fixture.detectChanges();

    expect(navigateSpy).toHaveBeenCalledWith(['/404']);
  }));

});

describe('AdminItemFormComponent', () => {
  let component: AdminItemFormComponent;
  let fixture: ComponentFixture<AdminItemFormComponent>;
  let route: ActivatedRoute;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ AdminItemFormComponent],
      imports: [ HttpClientTestingModule, RouterTestingModule, FormsModule ]
    })
    .compileComponents();
  });

  it('should display empty form on create new Item', fakeAsync( () => {
    route = TestBed.inject(ActivatedRoute);
    const spyRoute = spyOn(route.snapshot.paramMap, 'get');
    spyRoute.and.returnValue(null); //new item


    fixture = TestBed.createComponent(AdminItemFormComponent);
    component = fixture.componentInstance;
    tick();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    console.log((<HTMLInputElement>fixture.debugElement.query(By.css('#id')).nativeElement).value);
    expect((<HTMLInputElement>fixture.debugElement.query(By.css('#id')).nativeElement).value).toEqual('0');
    expect((<HTMLInputElement>fixture.debugElement.query(By.css('#name')).nativeElement).value).toEqual('');

  }));

});

describe('AdminItemFormComponent', () => {
  let component: AdminItemFormComponent;
  let fixture: ComponentFixture<AdminItemFormComponent>;
  let router: Router;
  let route: ActivatedRoute;

  beforeEach(async () => {

    let testItem = {id:1, name:"aa", price:1, category:"shoes", description:"bb"};
    const itemService = jasmine.createSpyObj('ItemService', ['getItem']);
    let getItemsSpy = itemService.getItem.and.returnValue(of(testItem));

    await TestBed.configureTestingModule({
      declarations: [ AdminItemFormComponent],
      imports: [ HttpClientTestingModule, RouterTestingModule, FormsModule ],
      providers: [{ provide: ItemService, useValue: itemService}]
    })
    .compileComponents();
  });

  it('should have disabled save button at load', fakeAsync(() => { 
    route = TestBed.inject(ActivatedRoute);
    const spyRoute = spyOn(route.snapshot.paramMap, 'get');
    spyRoute.and.returnValue('1'); //itemID = 1

    fixture = TestBed.createComponent(AdminItemFormComponent);
    component = fixture.componentInstance;

    tick();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    //it worked only with 2 ticks
    expect((<HTMLInputElement>fixture.debugElement.query(By.css('#id')).nativeElement).value).toEqual('1');
    expect((<HTMLElement>fixture.debugElement.query(By.css('#submit')).nativeElement).getAttribute("disabled")).toEqual('');
  }));

  it('should have disabled save button at new item', fakeAsync(() => { 
    route = TestBed.inject(ActivatedRoute);
    const spyRoute = spyOn(route.snapshot.paramMap, 'get');
    spyRoute.and.returnValue(null); 

    fixture = TestBed.createComponent(AdminItemFormComponent);
    component = fixture.componentInstance;

    tick();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    //it worked only with 2 ticks
    expect((<HTMLInputElement>fixture.debugElement.query(By.css('#id')).nativeElement).value).toEqual('0');
    expect((<HTMLElement>fixture.debugElement.query(By.css('#submit')).nativeElement).getAttribute("disabled")).toEqual('');
  }));

  it('should disable save button correctly', fakeAsync(() => { 
    route = TestBed.inject(ActivatedRoute);
    const spyRoute = spyOn(route.snapshot.paramMap, 'get');
    spyRoute.and.returnValue('1'); //itemID = 1

    fixture = TestBed.createComponent(AdminItemFormComponent);
    component = fixture.componentInstance;

    tick();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    //it worked only with 2 ticks
    expect((<HTMLInputElement>fixture.debugElement.query(By.css('#id')).nativeElement).value).toEqual('1');

    let el:HTMLInputElement = fixture.debugElement.query(By.css('#price')).nativeElement;
    el.value = "";
    el.dispatchEvent(new Event("input"));

    tick();
    fixture.detectChanges();

    console.log(fixture.debugElement.query(By.css('#submit')).nativeElement);
    console.log(fixture.debugElement.query(By.css('#price')).nativeElement);
    expect((<HTMLElement>fixture.debugElement.query(By.css('#submit')).nativeElement).getAttribute("disabled")).toEqual('', 'before');

    el.value = "12";
    el.dispatchEvent(new Event("input"));

    tick();
    fixture.detectChanges();
    console.log(fixture.debugElement.query(By.css('#submit')).nativeElement);
    console.log(fixture.debugElement.query(By.css('#price')).nativeElement);
    console.log(component.item.price);
    expect((<HTMLElement>fixture.debugElement.query(By.css('#submit')).nativeElement).getAttribute("disabled")).toEqual(null, 'after');

    //description is not a mandatory element
    el = fixture.debugElement.query(By.css('#description')).nativeElement;
    el.value = "12";
    el.dispatchEvent(new Event("input"));
    tick();
    fixture.detectChanges();
    expect((<HTMLElement>fixture.debugElement.query(By.css('#submit')).nativeElement).getAttribute("disabled")).toEqual(null);


  }));

});

describe('AdminItemFormComponent', () => {
  let component: AdminItemFormComponent;
  let fixture: ComponentFixture<AdminItemFormComponent>;
  let router: Router;
  let route: ActivatedRoute;
  let itemService: ItemService;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ AdminItemFormComponent],
      imports: [ HttpClientTestingModule, RouterTestingModule, FormsModule ],
      providers: [{ provide: ItemService, useClass: ItemServiceStub}]
    })
    .compileComponents();
  });

  it('should call ItemService.update (version 1-with Service Stub)', fakeAsync( () => {
    route = TestBed.inject(ActivatedRoute);
    const spyRoute = spyOn(route.snapshot.paramMap, 'get');
    spyRoute.and.returnValue('1'); //itemID = 1

    fixture = TestBed.createComponent(AdminItemFormComponent);
    component = fixture.componentInstance;
    spyOn(component.itemService, 'updateItem').and.callThrough();
    tick();
    fixture.detectChanges();

    component.onSubmit();
    
    tick();
    fixture.detectChanges();

    let item:Item = {id:1, name:"aa", price:1, category:"shoes", description:"bb"};
    expect(component.itemService.updateItem).toHaveBeenCalledWith(item);
  }));

});

describe('AdminItemFormComponent', () => {
  let component: AdminItemFormComponent;
  let fixture: ComponentFixture<AdminItemFormComponent>;
  let router: Router;
  let route: ActivatedRoute;
  let itemService: ItemService;
  let updateItemSpy;

  beforeEach(async () => {

    let testItem = {id:1, name:"aa", price:1, category:"shoes", description:"bb"};
    const itemServiceSpy = jasmine.createSpyObj('ItemService', ['getItem', 'updateItem']);
    let getItemSpy = itemServiceSpy.getItem.and.returnValue(of(testItem));
    updateItemSpy = itemServiceSpy.updateItem.and.returnValue(of(testItem));

    await TestBed.configureTestingModule({
      declarations: [ AdminItemFormComponent],
      imports: [ HttpClientTestingModule, RouterTestingModule, FormsModule ],
      providers: [{ provide: ItemService, useValue: itemServiceSpy}]
    })
    .compileComponents();
  });

  it('should call ItemService.update (version 2-with spyOn)', fakeAsync( () => {

    route = TestBed.inject(ActivatedRoute);
    const spyRoute = spyOn(route.snapshot.paramMap, 'get');
    spyRoute.and.returnValue('1'); //itemID = 1

    fixture = TestBed.createComponent(AdminItemFormComponent);
    component = fixture.componentInstance;
    tick();
    fixture.detectChanges();

    component.onSubmit();
    
    tick();
    fixture.detectChanges();

    let item:Item = {id:1, name:"aa", price:1, category:"shoes", description:"bb"};
    expect(component.itemService.updateItem).toHaveBeenCalledWith(item);
  }));

});

describe('AdminItemFormComponent', () => {
  let component: AdminItemFormComponent;
  let fixture: ComponentFixture<AdminItemFormComponent>;
  let router: Router;
  let route: ActivatedRoute;
  let itemService: ItemService;
  let addItemSpy;

  beforeEach(async () => {

    let testItem = {id:0, name:"", price:0, category:"", description:""};
    const itemServiceSpy = jasmine.createSpyObj('ItemService', ['getItem', 'addItem']);
    let getItemSpy = itemServiceSpy.getItem.and.returnValue(of(testItem));
    addItemSpy = itemServiceSpy.addItem.and.returnValue(of(testItem));

    await TestBed.configureTestingModule({
      declarations: [ AdminItemFormComponent],
      imports: [ HttpClientTestingModule, RouterTestingModule, FormsModule ],
      providers: [{ provide: ItemService, useValue: itemServiceSpy}]
    })
    .compileComponents();
  });

  it('should call ItemService.add', fakeAsync( () => {

    route = TestBed.inject(ActivatedRoute);
    const spyRoute = spyOn(route.snapshot.paramMap, 'get');
    spyRoute.and.returnValue(null);

    fixture = TestBed.createComponent(AdminItemFormComponent);
    component = fixture.componentInstance;
    tick();
    fixture.detectChanges();
    
    component.item = {id:0, name:"aa", price:1, category:"shoes", description:"bb"};
    tick();
    fixture.detectChanges();

    component.onSubmit();
    
    tick();
    fixture.detectChanges();

    let item:Item = {id:0, name:"aa", price:1, category:"shoes", description:"bb"};
    expect(component.itemService.addItem).toHaveBeenCalledWith(item);
  }));

});
