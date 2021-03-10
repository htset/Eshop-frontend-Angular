import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from '@app/_models/user';
import { MockActivatedRoute } from '@app/_services/active.route.mock';
import { of } from 'rxjs';

import { LoginComponent } from './login.component';

let testUser:User = 
{
    id: 1,
    username: 'htset',
    password: '',
    firstName: 'Haris',
    lastName: 'Tse',
    token: '',
    role: 'admin',
    email: 'haris@tse.gr'
};

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let activatedRouteStub: MockActivatedRoute;

  beforeEach(async () => {
    activatedRouteStub = new MockActivatedRoute();
    activatedRouteStub.testParams = {
      returnUrl: '/checkout'
    };

    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        ReactiveFormsModule, 
        RouterTestingModule, 
        HttpClientTestingModule
      ],
/*      
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
*/

      providers: [ 
        { 
          provide: ActivatedRoute,
          useValue: {snapshot: {queryParams: {'returnUrl': '/checkout'}}}
        }
      ]
      
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should process login successfully', fakeAsync(() => {
    spyOn(component.authenticationService, 'login').and.returnValue(of(testUser));
    spyOn(component.router, 'navigate');

    tick();
    fixture.detectChanges();

    let usr: HTMLInputElement = fixture.debugElement.query(By.css('input[formControlName="username"]')).nativeElement
    usr.value = 'aa';
    usr.dispatchEvent(new Event('input'));
    let pass: HTMLInputElement = fixture.debugElement.query(By.css('input[formControlName="password"]')).nativeElement
    pass.value = 'aa';
    pass.dispatchEvent(new Event('input'));

    tick();
    fixture.detectChanges();

    let el: HTMLButtonElement = fixture.debugElement.query(By.css('#login')).nativeElement;
    expect(el.disabled).toBeFalse();
    /*
      https://stackoverflow.com/questions/47387325/angular-unit-test-failing-when-using-submit

      "Because you have no event handler on the button. That's why triggerEventHandler can't trigger any handler on the button. 
      In your case you have to use saveButton.nativeElement.click() because now click event will be bubbled and submit event will be fired

    */
    el.click();
    //el.dispatchEvent(new Event('click'));
    tick();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(component.router.navigate).toHaveBeenCalledWith(['/checkout']);
  }));
});
