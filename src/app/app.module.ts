import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { StudentComponent } from './student/student.component';
import { StudentListComponent } from './student-list/student-list.component';
import {StudentService} from './student.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import { SpookyComponent } from './spooky/spooky.component';
import {ReactiveFormsModule} from '@angular/forms';
import {PopoverModule} from 'ngx-popover';
import {Interceptor} from './app.interceptor';
import { LoginComponent } from './login/login.component';
import {AuthService} from './auth.service';
import {TokenStorage} from './token.storage';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: StudentListComponent},
  {path: 'spooky', component: SpookyComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    StudentListComponent,
    SpookyComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  providers: [StudentService, AuthService, TokenStorage, TokenStorage,
    {provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
