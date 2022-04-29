import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';

import { LoginComponent } from './login.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';

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

  it('Teste contagem rendereização do formulário login', () => {
    const formElement = fixture.debugElement.nativeElement.querySelector('form');
    const imputElements = formElement.querySelectorAll('input');
    expect(imputElements.length).toEqual(2);
  });

  it('Teste com inserção de dados login', (done) => {
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

  it('Teste de contagem de renderização de formulário cadastro professor', (done) => {
    const buttonElement = fixture.debugElement.query(By.css('.register-button'));
    buttonElement.triggerEventHandler('click', null); 
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const formElement = fixture.debugElement.nativeElement.querySelector('form');
      const imputElements = formElement.querySelectorAll('input');
      expect(imputElements.length).toEqual(3);
      done();
    });
  });

  it('Teste com inserção de dados cadastro professor', (done) => {
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
});
