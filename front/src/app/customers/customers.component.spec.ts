import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { CustomersComponent } from './customers.component';

describe('CustomersComponent', () => {
  let component: CustomersComponent;
  let fixture: ComponentFixture<CustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersComponent ],
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule, MatSnackBarModule, RouterTestingModule.withRoutes([])]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should render the customer registration form', () => {
    const formElement = fixture.debugElement.nativeElement.querySelector('form');
    const inputElements = formElement.querySelectorAll('input');
    expect(inputElements.length).toEqual(3);
  })

  it('Should enter customer registration data', (done) => {
    const loginFormUserEmailElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('form').querySelectorAll('input')[2];
    const loginFormUserNameElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('form').querySelectorAll('input')[0];
    const loginFormPasswordElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('form').querySelectorAll('input')[1];
    loginFormUserEmailElement.value = 'teste@teste.com';
    loginFormUserNameElement.value = 'teste';
    loginFormPasswordElement.value = '123';
    loginFormUserEmailElement.dispatchEvent(new Event('input'));
    loginFormUserNameElement.dispatchEvent(new Event('input'));
    loginFormPasswordElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const userNameValueFormGroup = component.form.get('name');
      const userEmailValueFormGroup = component.form.get('email');
      const userPasswordValueFormGroup = component.form.get('password');
      expect(loginFormUserNameElement.value).toEqual(userNameValueFormGroup.value);
      expect(loginFormUserEmailElement.value).toEqual(userEmailValueFormGroup.value);
      expect(loginFormPasswordElement.value).toEqual(userPasswordValueFormGroup.value);
      done();
    });
  });

  it('Should be enter a valid email',(done) => {
      const loginFormUserEmailElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('form').querySelectorAll('input')[1];
      loginFormUserEmailElement.value = 'teste@teste.com';
      loginFormUserEmailElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(loginFormUserEmailElement.value).toContain('@', '.');
        done();
      });
  });

  it('Should not be enter a value null or void',(done) => {
    const loginFormUserEmailElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('form').querySelectorAll('input')[1];
    const loginFormUserEmailElementNull: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('form').querySelectorAll('input')[1];
    loginFormUserEmailElementNull.value = null;
    loginFormUserEmailElement.value = '';
    loginFormUserEmailElementNull.dispatchEvent(new Event('input'));
    loginFormUserEmailElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(loginFormUserEmailElementNull.value).toBeLessThan(1);
      expect(loginFormUserEmailElement.value).toBeLessThan(1);
      done();
    });
  });

});
