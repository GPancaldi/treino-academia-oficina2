import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { CustomersComponent } from './customers.component';

describe('CustomersComponent', () => {
  let component: CustomersComponent;
  let fixture: ComponentFixture<CustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersComponent ],
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule, RouterTestingModule.withRoutes([])]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Teste contagem rendereização do formulário cadastro de cliente', () => {
    const formElement = fixture.debugElement.nativeElement.querySelector('form');
    const imputElements = formElement.querySelectorAll('input');
    expect(imputElements.length).toEqual(3);
  })

  it('Teste com inserção de dados cadastro de cliente', (done) => {
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
});
