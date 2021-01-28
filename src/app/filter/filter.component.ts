import { Component, OnInit,  Output, EventEmitter  } from '@angular/core';
import { Filter } from '../_models/filter';
import { StoreService } from '../_services/store.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Output() filterChangedEvent = new EventEmitter<Filter>();

  categories = [
    {name: "shoes", selected: false},
    {name: "clothes", selected: false},
    {name: "glasses", selected: false}
  ];

  constructor(public storeService: StoreService) { }
  
  ngOnInit(): void {
    this.categories = this.categories.map(cat => ({name: cat.name, selected: (this.storeService.filter.categories.includes(cat.name))}));
  }

  onKeyUp(e: Event) :void {
    this.storeService.filter.name = this.storeService.filter.name;
  }

  onChange(): void{
    this.storeService.filter.categories = this.categories.filter(c => c.selected).map(cc => cc.name);
    console.log(this.storeService.filter.categories);
  }

  onFilterChanged(): void {
    this.filterChangedEvent.emit(this.storeService.filter);
  }
 
}
