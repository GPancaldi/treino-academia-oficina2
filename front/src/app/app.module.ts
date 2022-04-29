import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule }  from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatListModule } from '@angular/material/list';
import { WorkoutsComponent } from './workouts/workouts.component';
import { GymsComponent } from './gyms/gyms.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import { ExercisesComponent } from './exercises/exercises/exercises.component';
import { ApiService } from './shared/services/api.service';
import { UserInfoService } from './shared/services/user-info.service';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    WorkoutsComponent,
    GymsComponent,
    LoginComponent,
    ExercisesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatListModule,
    MatTableModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
    ApiService,
    UserInfoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
