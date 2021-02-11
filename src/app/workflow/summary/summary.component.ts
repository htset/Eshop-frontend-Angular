import { Component, OnInit } from '@angular/core';
import { User } from '@app/_models/user';
import { StoreService } from '@app/_services/store.service';
import { UserService } from '@app/_services/user.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  public userInOrder?: User;
  constructor(private storeService: StoreService,
              private userService:UserService) { }

  ngOnInit(): void {
    let userId = this.storeService.order.userId || 0;
    if(userId > 0)  
      this.userService.getUser(userId).subscribe((user=> this.userInOrder = user));
  }

}
