import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Filter } from '@app/_models/filter';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { FilterComponent } from './filter.component';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterComponent ],
      imports: [FormsModule],
      providers: [NgbActiveModal]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit with correct filter', fakeAsync( () => {
    const searchBox: HTMLInputElement = fixture.debugElement.query(By.css('#searchbox')).nativeElement;
    searchBox.value = "ss";
    searchBox.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick();
    console.log(component.tempFilter);
    expect(component.tempFilter.name).toEqual("ss");

    const checkBox1: HTMLInputElement = fixture.debugElement.query(By.css('#shoes')).nativeElement;
    checkBox1.checked = true;
    checkBox1.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    tick();

    console.log(component.tempFilter);
    expect(component.tempFilter.categories).toEqual(["shoes"]);

    const update: HTMLElement = fixture.debugElement.query(By.css('#update')).nativeElement;
    update.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    tick();

    console.log(component.storeService.filter);
    //object destructing because we got error : Expected object to be a kind of Object, but was Filter({ name: 'ss', categories: [ 'shoes' ] }).
    expect({...component.storeService.filter}).toEqual({name:"ss", categories: ["shoes"]});

  }));

});
