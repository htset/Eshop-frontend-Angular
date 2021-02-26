import { Component, OnInit,  Output, EventEmitter, ViewChild, ElementRef  } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Filter } from '../../_models/filter';
import { StoreService } from '../../_services/store.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Output() filterChangedEvent = new EventEmitter<Filter>();
  @ViewChild('content') content: ElementRef = new ElementRef('<ng-template>');
  closeResult = '';
  
  categories = [
    {name: "shoes", selected: false},
    {name: "clothes", selected: false},
    {name: "glasses", selected: false}
  ];

  tempFilter:Filter = new Filter("", []);

  constructor(public storeService: StoreService,
    public activeModal: NgbActiveModal) { 
/*    this.storeService.filterDisplay$.subscribe((display)=>{
      if(display == true)
        this.open(this.content);
    })
*/    
  }
  
/*  
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
*/
  ngOnInit(): void {
    this.tempFilter = this.storeService.filter;
    this.categories = this.categories.map(cat => ({name: cat.name, selected: (this.tempFilter.categories.includes(cat.name))}));
  }
/*
  onKeyUp(e: Event) :void {
    this.storeService.filter.name = this.storeService.filter.name;
  }
*/
  onChange(): void{
    console.log("on change");
    this.tempFilter.categories = this.categories.filter(c => c.selected).map(cc => cc.name);
    console.log(this.tempFilter.categories);
  }

  onFilterChanged(): void {
    //this.filterChangedEvent.emit(this.storeService.filter);
    this.storeService.filter = this.tempFilter;
  }
 
}
