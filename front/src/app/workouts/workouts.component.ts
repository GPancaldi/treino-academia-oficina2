import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { Workout } from '../shared/interfaces/workouts.interface';
import { ApiService } from '../shared/services/api.service';
import { UserInfoService } from '../shared/services/user-info.service';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.scss']
})

export class WorkoutsComponent implements OnInit {

  constructor(
    private _userInfo: UserInfoService,
    private router: Router,
    private _api: ApiService
    ) { }

  exercisesList: any[];

  form: FormGroup = new FormGroup({
  //  workout:  new FormControl('', [Validators.required]),
    name:  new FormControl('', [Validators.required]),
  //  weight: new FormControl('', [Validators.required]),
  //  reps: new FormControl('', [Validators.required]),
  //  series: new FormControl('', [Validators.required]),
  });
  

  //@ViewChild(MatTable) table: MatTable<Workout>;
//
  //displayedColumns: string[] = ['workout', 'name', 'weight', 'reps', 'series'];
  //dataSource: Workout[] = [];
  //clickedRow: Workout = {} as Workout;
  //isEdit = false;
//
ngOnInit(): void {
  if(!this._userInfo.getUserInfo())
    this.router.navigate(['/login']);
}

add() {
  return new Promise((resolve, reject) => {
    this._api.post('/cliente', this.form)
      .subscribe((response: any) => {
        resolve(response)
      }, reject)
  })
}

getExercises() {

}

//
  //clickGrid(row: Workout): void {
  //  this.clickedRow = row;
//
  //  this.form.patchValue({
  //    id: row.id,
  //    name: row.name,
  //    workout: row.workout,
  //    weight: row.weight,
  //    reps: row.reps,
  //    series: row.series
  //  })
//
  //  this.isEdit = true;
  //}
//
  //addWorkout() {
//
  //  
  //  this.dataSource.push({
  //    id: 1,
  //    name: this.form.controls.name.value,
  //    workout: this.form.controls.workout.value,
  //    weight: this.form.controls.weight.value,
  //    reps: this.form.controls.reps.value,
  //    series: this.form.controls.series.value
  //  })
//
  //  this.form.patchValue({
  //    name: null,
  //    workout: null,
  //    weight: null,
  //    reps: null,
  //    series: null
  //  });
//
  //  this.table.renderRows();
  //}
//
  //editWorkout() {
  //  this.isEdit = false;
  //}
//
  //removeWorkout() {
  //  this.isEdit = false;
  //}
}

