import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '@app/_services/authentication.service';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup = new FormGroup({});
    loading = false;
    submitted = false;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        public route: ActivatedRoute,
        public router: Router,
        public authenticationService: AuthenticationService
    ) { 
        // redirect to home if already logged in
/*        if (this.authenticationService.currentUserValue.id) { 
            this.router.navigate(['/admin']);
        }
*/
/*        if(this.route.snapshot.queryParams['role'] == "customer")
            this.error = "Access to page is restricted. You should login with admin credentials";
*/            
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm?.controls; }

    onSubmit() {
        this.submitted = true;
        console.log('on submit');
        // stop here if form is invalid
        if (this.loginForm?.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f?.username.value, this.f?.password.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    console.log('login ok');
                    console.log(this.route.snapshot);
                    // get return url from route parameters or default to '/'
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                    console.log(returnUrl);
                    this.router.navigate([returnUrl]);
                },
                error: error => {
                    //this.error = error;
                    this.loading = false;
                }
            });
    }
}