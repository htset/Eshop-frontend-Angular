import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NotFoundComponent } from '@app/not-found/not-found.component';
import { Item } from '@app/_models/item';
import { ItemService } from '@app/_services/item.service';
import { asapScheduler, Observable, of, throwError } from 'rxjs';
import { observeOn } from 'rxjs/operators';

import { AdminItemFormComponent } from './admin-item-form.component';

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

  beforeEach(() => {
    route = TestBed.inject(ActivatedRoute);
    const spyRoute = spyOn(route.snapshot.paramMap, 'get');
    spyRoute.and.returnValue('1'); //itemID = 1

    fixture = TestBed.createComponent(AdminItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display selected item', fakeAsync( () => {
    expect(component.item.name).toEqual('aa');
    tick();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    ///It worked only with whenStable()  !!
    fixture.whenStable().then( () => {
      console.log((<HTMLInputElement>fixture.debugElement.query(By.css('#id')).nativeElement).value);
      expect((<HTMLInputElement>fixture.debugElement.query(By.css('#id')).nativeElement).value).toEqual('1');
      expect((<HTMLInputElement>fixture.debugElement.query(By.css('#name')).nativeElement).value).toEqual('aa');
     });    

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

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ AdminItemFormComponent],
      imports: [ HttpClientTestingModule, RouterTestingModule, FormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    route = TestBed.inject(ActivatedRoute);
    const spyRoute = spyOn(route.snapshot.paramMap, 'get');
    spyRoute.and.returnValue(null); //new item

    fixture = TestBed.createComponent(AdminItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display empty form on create new Item', fakeAsync( () => {
    expect(component.item.name).toEqual('');
    tick();
    fixture.detectChanges();

    ///It worked only with whenStable()  !!
    fixture.whenStable().then( () => {
      console.log((<HTMLInputElement>fixture.debugElement.query(By.css('#id')).nativeElement).value);
      expect((<HTMLInputElement>fixture.debugElement.query(By.css('#id')).nativeElement).value).toEqual('0');
      expect((<HTMLInputElement>fixture.debugElement.query(By.css('#name')).nativeElement).value).toEqual('');
     })    

  }));

});

