import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';

import { LoginComponent } from './login.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { ApiService } from '../shared/services/api.service';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule, RouterTestingModule.withRoutes([]), MatSnackBarModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should test the login form render count', () => {
    const formElement = fixture.debugElement.nativeElement.querySelector('form');
    const inputElements = formElement.querySelectorAll('input');
    expect(inputElements.length).toEqual(2);
  });

  it('should test login input data', (done) => {
    const loginFormEmailElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('form').querySelectorAll('input')[0];
    const loginFormPasswordElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('form').querySelectorAll('input')[1];
    loginFormEmailElement.value = 'teste@teste.com';
    loginFormPasswordElement.value = '123';
    loginFormEmailElement.dispatchEvent(new Event('input'));
    loginFormPasswordElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const userEmailValueFormGroup = component.form.get('email');
      const userPasswordValueFormGroup = component.form.get('password');
      expect(loginFormEmailElement.value).toEqual(userEmailValueFormGroup.value);
      expect(loginFormPasswordElement.value).toEqual(userPasswordValueFormGroup.value);
      done();
    });
  });

  it('should test teacher registration form render count', (done) => {
    const buttonElement = fixture.debugElement.query(By.css('.register-button'));
    buttonElement.triggerEventHandler('click', null); 
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const formElement = fixture.debugElement.nativeElement.querySelector('form');
      const inputElements = formElement.querySelectorAll('input');
      expect(inputElements.length).toEqual(3);
      done();
    });
  });

  it('should test with data entry teacher registration', (done) => {
    const buttonElement = fixture.debugElement.query(By.css('.register-button'));
    buttonElement.triggerEventHandler('click', null); 
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const loginFormUserEmailElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('form').querySelectorAll('input')[1];
      const loginFormUserNameElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('form').querySelectorAll('input')[0];
      const loginFormPasswordElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('form').querySelectorAll('input')[2];
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
  });

  it('Should be enter a valid email',(done) => {
    const buttonElement = fixture.debugElement.query(By.css('.register-button'));
    buttonElement.triggerEventHandler('click', null); 
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const loginFormUserEmailElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('form').querySelectorAll('input')[1];
      loginFormUserEmailElement.value = 'teste@teste.com';
      loginFormUserEmailElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(loginFormUserEmailElement.value).toContain('@', '.');
        done();
      });
    });
  });

  it('should be test call api', () => {
    spyOn(component, 'onLogin');
    component.onLogin();
    expect(component.onLogin).toHaveBeenCalled();
  });

  it('should be test send data to api', () => {
    var obj: {
      email: "teste@teste.com",
      senha: "123";
    }
    let services = fixture.debugElement.injector.get(ApiService);
    spyOn(services, 'post').and.callFake(()=>{
      return of({
        endpoint: '/user/login',
        formValue: obj
      })
    });
    services.post('/user/login', obj);
    expect(services.post).toHaveBeenCalledWith('/user/login', obj);
  });
});
