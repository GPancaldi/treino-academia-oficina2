import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomersComponent } from './customers/customers.component';
import { ExercisesListComponent } from './exercises-list/exercises-list.component';
import { ExercisesComponent } from './exercises/exercises/exercises.component';
import { GymsComponent } from './gyms/gyms.component';
import { LoginComponent } from './login/login.component';
import { WorkoutsCutomersListComponent } from './workouts-customers-list/workouts-customers-list.component';
import { WorkoutsListComponent } from './workouts-list/workouts-list.component';
import { WorkoutsComponent } from './workouts/workouts.component';

const routes: Routes = [
  {
    path:'', redirectTo:'customers', pathMatch: 'full'
  },
  {
    path:'customers', component: CustomersComponent
  },
  {
    path: 'customers/:id', component: CustomersComponent
  },
  {
    path: 'customers-list', component: CustomersListComponent
  },
  {
    path:'gyms', component: GymsComponent
  },
  {
    path:'workouts', component: WorkoutsComponent
  },
  {
    path:'workouts/:id', component: WorkoutsComponent
  },
  {
    path:'workouts-list', component: WorkoutsListComponent
  },
  {
    path:'login', component: LoginComponent
  },
  {
    path:'exercises', component: ExercisesComponent
  },
  {
    path:'exercises/:id', component: ExercisesComponent
  },
  {
    path:'exercises-list', component: ExercisesListComponent
  },
  {
    path:'customers-workouts-list', component: WorkoutsCutomersListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
