import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { PaymentComponent } from './payment.component';

describe('PaymentComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validates form correctly', fakeAsync(() => {

    expect(fixture.debugElement.query(By.css('button')).nativeElement.disabled).toBeTruthy();

    let form = component.paymentForm.controls;

    expect(form.cardnumber.valid).toBe(false);
    form.cardnumber.setValue('111122223333444a');
    expect(form.cardnumber.valid).toBe(false);
    form.cardnumber.setValue('111122223333444');
    expect(form.cardnumber.valid).toBe(false);
    form.cardnumber.setValue('1111222233334444');
    expect(form.cardnumber.valid).toBe(true);

    expect(component.paymentForm.valid).toBe(false);

    expect(form.code.valid).toBe(false);
    form.code.setValue('1111');
    expect(form.code.valid).toBe(false);
    form.code.setValue('11');
    expect(form.code.valid).toBe(false);
    form.code.setValue('1a3');
    expect(form.code.valid).toBe(false);
    form.code.setValue('111');
    expect(form.code.valid).toBe(true);

    expect(component.paymentForm.valid).toBe(false);

    expect(form.holdername.valid).toBe(false);
    form.holdername.setValue('aa ff');
    expect(form.holdername.valid).toBe(true);

    expect(component.paymentForm.valid).toBe(false);

    expect(form.expirymonth.valid).toBe(false);
    form.expirymonth.setValue('7');
    expect(form.expirymonth.valid).toBe(true);

    expect(component.paymentForm.valid).toBe(false);

    expect(form.expiryyear.valid).toBe(false);
    form.expiryyear.setValue('2023');
    expect(form.expiryyear.valid).toBe(true);

    expect(component.paymentForm.valid).toBe(true);

    fixture.detectChanges();
    tick();
    let submitButton = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(submitButton.disabled).toBeFalsy();


  }));

  it('sends data from form to view correctly', fakeAsync(() => {
    let form = component.paymentForm.controls;

    form.cardnumber.setValue('1111222233334444');
    form.code.setValue('111');
    form.holdername.setValue('aa ff');
    form.expirymonth.setValue('7');
    form.expiryyear.setValue('2023');

    expect(component.paymentForm.valid).toBe(true);

    fixture.detectChanges();
    tick();
    expect(fixture.debugElement.query(By.css('input[formControlName="cardnumber"]')).nativeElement.value).toEqual('1111222233334444');
    expect(fixture.debugElement.query(By.css('input[formControlName="holdername"]')).nativeElement.value).toEqual('aa ff');
    expect(fixture.debugElement.query(By.css('input[formControlName="code"]')).nativeElement.value).toEqual('111');
    //Attention: 'select', not 'input'
    expect(fixture.debugElement.query(By.css('select[formControlName="expirymonth"]')).nativeElement.value).toEqual('7');
    expect(fixture.debugElement.query(By.css('select[formControlName="expiryyear"]')).nativeElement.value).toEqual('2023');

    let submitButton = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(submitButton.disabled).toBeFalsy();


  }));

  it('sends data from view to form correctly', fakeAsync(() => {
    let form = component.paymentForm.controls;

    fixture.debugElement.query(By.css('input[formControlName="cardnumber"]')).nativeElement.value = '1111222233334444';
    fixture.debugElement.query(By.css('input[formControlName="holdername"]')).nativeElement.value = 'aa ff';
    fixture.debugElement.query(By.css('input[formControlName="code"]')).nativeElement.value = '111';
    fixture.debugElement.query(By.css('select[formControlName="expirymonth"]')).nativeElement.value = '7';
    fixture.debugElement.query(By.css('select[formControlName="expiryyear"]')).nativeElement.value = '2023';

    fixture.debugElement.query(By.css('input[formControlName="cardnumber"]')).nativeElement.dispatchEvent(new Event('input'));
    fixture.debugElement.query(By.css('input[formControlName="holdername"]')).nativeElement.dispatchEvent(new Event('input'));
    fixture.debugElement.query(By.css('input[formControlName="code"]')).nativeElement.dispatchEvent(new Event('input'));
    //Attention --> event: 'change', not 'input'
    fixture.debugElement.query(By.css('select[formControlName="expirymonth"]')).nativeElement.dispatchEvent(new Event('change'));
    fixture.debugElement.query(By.css('select[formControlName="expiryyear"]')).nativeElement.dispatchEvent(new Event('change'));

    fixture.detectChanges();
    tick();
    expect(component.paymentForm.valid).toBe(true);

    expect(form.cardnumber.value).toEqual('1111222233334444');
    expect(form.code.value).toEqual('111');
    expect(form.holdername.value).toEqual('aa ff');
    expect(form.expirymonth.value).toEqual('7');
    expect(form.expiryyear.value).toEqual('2023');

    let submitButton = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(submitButton.disabled).toBeFalsy();


  }));

});
