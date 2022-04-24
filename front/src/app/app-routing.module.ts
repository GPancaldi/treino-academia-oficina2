import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { ExercisesComponent } from './exercises/exercises/exercises.component';
import { GymsComponent } from './gyms/gyms.component';
import { LoginComponent } from './login/login.component';
import { WorkoutsComponent } from './workouts/workouts.component';

const routes: Routes = [
  {
    path:'', redirectTo:'login', pathMatch: 'full'
  },
  {
    path:'customers', component: CustomersComponent
  },
  {
    path:'gyms', component: GymsComponent
  },
  {
    path:'workouts', component: WorkoutsComponent
  },
  {
    path:'login', component: LoginComponent
  },
  {
    path:'exercises', component: ExercisesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
