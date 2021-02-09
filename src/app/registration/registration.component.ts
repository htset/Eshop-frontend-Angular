import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '@app/_models/user';
import { AuthenticationService } from '@app/_services/authentication.service';
import { UserService } from '@app/_services/user.service';
import { passwordsMustMatchValidator } from '@app/_validators/passwordsMustMatch';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  submitted = false;
  success:boolean = false;
  failure:boolean = false;
  errorMessage?: string;

registrationForm = new FormGroup({
      username: new FormControl('test1', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('test1', Validators.required),
      confirmPassword: new FormControl('test1', Validators.required),
      email: new FormControl('t@t.gr', [Validators.required, Validators.email]),
    }, { validators: [passwordsMustMatchValidator] });

    constructor(private userService:UserService,
              public authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.warn(this.registrationForm.value);
    this.submitted = true;
    if(!this.registrationForm.valid)
      return;

    this.userService.addUser(
        {
          username: this.registrationForm.controls.username.value,
          password: this.registrationForm.controls.password.value,
          email: this.registrationForm.controls.email.value
        }).subscribe({
          next: x => {
            console.log('Observer got a next value: ' + x);
            this.success = true;
            this.failure = false;
          },
          error: err => {
            console.error('Observer got an error: ' + err);
            this.success = false;
            this.failure = true;
            this.errorMessage = err;
          },
          complete: () => console.log('Observer got a complete notification'),         
        });
  }
}
