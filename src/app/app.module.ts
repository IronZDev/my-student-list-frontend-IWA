import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { StudentComponent } from './student/student.component';
import { StudentListComponent } from './student-list/student-list.component';
import {StudentService} from './student.service';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import { SpookyComponent } from './spooky/spooky.component';
import {ReactiveFormsModule} from '@angular/forms';
import {PopoverModule} from 'ngx-popover';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: StudentListComponent},
  {path: 'spooky', component: SpookyComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    StudentListComponent,
    SpookyComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    PopoverModule
  ],
  providers: [StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
