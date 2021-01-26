import { Component, OnInit,  Output, EventEmitter  } from '@angular/core';
import { Filter } from '../filter';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Output() filterChangedEvent = new EventEmitter<Filter>();

  filter: Filter = {name:"", categories: []};
  insertedText:string = "";
  categories = [
    {name: "shoes", selected: false},
    {name: "clothes", selected: false},
    {name: "glasses", selected: false}
  ];

  constructor(public storeService: StoreService) { }
  
  ngOnInit(): void {
    this.filter = this.storeService.filter;
    this.categories = this.categories.map(cat => ({name: cat.name, selected: (this.storeService.filter.categories.includes(cat.name))}));
    console.log(this.filter);
  }

  onKeyUp(e: Event) :void {
    this.filter.name = this.insertedText;
  }

  onChange(): void{
    this.filter.categories = this.categories.filter(c => c.selected).map(cc => cc.name);
    console.log(this.filter.categories);
  }

  onFilterChanged(): void {
    this.storeService.filter = this.filter;
    this.filterChangedEvent.emit(this.filter);
  }
 
}
