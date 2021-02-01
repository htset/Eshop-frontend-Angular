import { Component, OnInit } from '@angular/core';
import { User } from '@app/_models/user';
import { UserService } from '@app/_services/user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  loading = false;
  users!: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
      this.loading = true;
//      this.userService.getAll().pipe(first()).subscribe(
        this.userService.getAll().subscribe(
        ((users:User[]) => {
          this.loading = false;
          this.users = users;
        }),
        ((err:any) => { 
          let a = err;
          console.log(err);
        }));
  }

}
