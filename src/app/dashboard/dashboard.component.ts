import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models/User';
import { UserService } from '@app/_services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  loading = false;
  users!: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
      this.loading = true;
      this.userService.getAll().pipe(first()).subscribe(users => {
          this.loading = false;
          this.users = users;
      });
  }

}
