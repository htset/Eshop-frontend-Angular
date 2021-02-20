import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './_models/user';
import { AuthenticationService } from './_services/authentication.service';
import { StoreService } from './_services/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My new e-shop!';
  user!: User;
  isOpen:boolean = false;

  constructor(
      private router: Router,
      public authenticationService: AuthenticationService,
      public storeService: StoreService
  ) {
      this.authenticationService.currentUser.subscribe(x => this.user = x);
  }

  logout(e: Event) {
    e.preventDefault();
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
