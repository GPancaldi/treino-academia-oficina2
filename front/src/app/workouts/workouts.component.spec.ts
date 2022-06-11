import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { LoginComponent } from '../login/login.component';
import { ApiService } from '../shared/services/api.service';

import { WorkoutsComponent } from './workouts.component';

describe('WorkoutsComponent', () => {
  let component: WorkoutsComponent;
  let fixture: ComponentFixture<WorkoutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkoutsComponent ],
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule, MatSnackBarModule, RouterTestingModule.withRoutes([{path: 'login', component: LoginComponent}])]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should render the workouts registration form', () => {
    const formElement = fixture.debugElement.nativeElement.querySelector('form');
    const inputElements = formElement.querySelectorAll('input');
    expect(inputElements.length).toEqual(1);
  })

  it('Should enter workouts registration data', (done) => {
    debugger;
    const workoutsNameElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('form').querySelectorAll('input')[0];

    workoutsNameElement.value = 'teste';

    workoutsNameElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const workoutsNameFormGroup = component.form.get('name');

      expect(workoutsNameElement.value).toEqual(workoutsNameFormGroup.value);
      done();
    });
  });

  it('Should not be enter a value null or void',(done) => {
    const workoutElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('form').querySelectorAll('input')[0];
    const workoutElementNull: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('form').querySelectorAll('input')[0];
    workoutElementNull.value = null;
    workoutElement.value = '';
    workoutElementNull.dispatchEvent(new Event('input'));
    workoutElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(workoutElementNull.value).toBeLessThan(1);
      expect(workoutElement.value).toBeLessThan(1);
      done();
    });
  });

  it('should be test call api', () => {
    spyOn(component, 'saveNew');
    component.saveNew();
    expect(component.saveNew).toHaveBeenCalled();
  });

  it('should be test send data to api', () => {
    var obj: {
      id: 1;
    }
    let services = fixture.debugElement.injector.get(ApiService);
    spyOn(services, 'post').and.callFake(()=>{
      return of({
        endpoint: '/workouts-list',
        formValue: obj
      })
    });
    services.post('/workouts-list', obj);
    expect(services.post).toHaveBeenCalledWith('/workouts-list', obj);
  });
});
