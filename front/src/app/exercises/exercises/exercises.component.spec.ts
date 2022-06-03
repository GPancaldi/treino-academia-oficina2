import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from 'src/app/login/login.component';

import { ExercisesComponent } from './exercises.component';

describe('ExercisesComponent', () => {
  let component: ExercisesComponent;
  let fixture: ComponentFixture<ExercisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExercisesComponent ],
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule, MatSnackBarModule, RouterTestingModule.withRoutes([{path: 'login', component: LoginComponent}])]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExercisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should render the exercises registration form', () => {
    const formElement = fixture.debugElement.nativeElement.querySelector('form');
    const inputElements = formElement.querySelectorAll('input');
    const matSelectElements = formElement.querySelectorAll('mat-select');
    expect(inputElements.length + matSelectElements.length).toEqual(4);
  })

  it('Should enter exercises registration data', (done) => {
    debugger;
    const exercisesNameElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('form').querySelectorAll('input')[0];
    const exercisesSeriesElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('form').querySelectorAll('input')[1];
    const exercisesRepsElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('form').querySelectorAll('input')[2];

    exercisesNameElement.value = 'teste';
    exercisesSeriesElement.value = '2';
    exercisesRepsElement.value = '2';

    exercisesNameElement.dispatchEvent(new Event('input'));
    exercisesSeriesElement.dispatchEvent(new Event('input'));
    exercisesRepsElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const exercisesNameFormGroup = component.form.get('name');
      const exercisesSeriesFormGroup = component.form.get('series');
      const exercisesRepsFormGroup = component.form.get('reps');

      expect(exercisesNameElement.value).toEqual(exercisesNameFormGroup.value);
      expect(exercisesSeriesElement.value.toString()).toEqual(exercisesSeriesFormGroup.value.toString());
      expect(exercisesRepsElement.value.toString()).toEqual(exercisesRepsFormGroup.value.toString());
      done();
    });
  });

  it('Should not be enter a value null or void',(done) => {
    const exerciseElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('form').querySelectorAll('input')[0];
    const exerciseElementNull: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('form').querySelectorAll('input')[0];
    exerciseElementNull.value = null;
    exerciseElement.value = '';
    exerciseElementNull.dispatchEvent(new Event('input'));
    exerciseElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(exerciseElementNull.value).toBeLessThan(1);
      expect(exerciseElement.value).toBeLessThan(1);
      done();
    });
  });

  it('Should not be enter a value null or void',(done) => {
    const exerciseElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('form').querySelectorAll('input')[1];
    const exerciseElementNull: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('form').querySelectorAll('input')[1];
    exerciseElementNull.value = null;
    exerciseElement.value = '';
    exerciseElementNull.dispatchEvent(new Event('input'));
    exerciseElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(exerciseElementNull.value).toBeLessThan(1);
      expect(exerciseElement.value).toBeLessThan(1);
      done();
    });
  });

  it('Should not be enter a value null or void',(done) => {
    const exerciseElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('form').querySelectorAll('input')[2];
    const exerciseElementNull: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('form').querySelectorAll('input')[2];
    exerciseElementNull.value = null;
    exerciseElement.value = '';
    exerciseElementNull.dispatchEvent(new Event('input'));
    exerciseElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(exerciseElementNull.value).toBeLessThan(1);
      expect(exerciseElement.value).toBeLessThan(1);
      done();
    });
  });
});