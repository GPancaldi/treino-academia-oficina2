import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { Workout } from '../shared/interfaces/workouts.interface';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-workouts-list',
  templateUrl: './workouts-list.component.html',
  styleUrls: ['./workouts-list.component.scss']
})
export class WorkoutsListComponent implements OnInit {

  constructor(
    private router: Router,
    private _api: ApiService
  ) { }

  displayedColumns: string[] = ['name'];
  clickedRow: Workout = {} as Workout;
  dataSource: Workout[] = [];

  @ViewChild(MatTable) table: MatTable<Workout>;

  ngOnInit(): void {
    this.renderGrid();
  }

  renderGrid(): void {
    new Promise((resolve, reject) => {
      this._api.get('/treino')
        .subscribe((response: any[]) => {
          console.log(response);
          
          response.forEach(x => {
            if (x.name !== '') {
              this.dataSource.push({
                id: x.id,
                name: x.name,
              })
            }
          });
          
          this.table.renderRows();
          resolve(response)
        }, reject)
    })
  }

  clickGrid(row: Workout): void {
    this.router.navigate(['/workouts/' + row.id + '']);
  }

  add(): void {
    this.router.navigate(['/workouts']);
  }
}
