import { Injectable } from '@angular/core';
import {Student} from './student';
import {Mark} from './mark';
import {HttpClient, HttpHandler, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class StudentService {

  private apiUrl = 'http://localhost:8080/students';

  constructor(private http: HttpClient) { }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl).pipe(
      tap((s) => {console.log(s); })
    );
  }

  addStudent(student: Student): Observable<Student> {
    console.log(student);
    return this.http.post<Student>(this.apiUrl, student, httpOptions);
}

  deleteStudent(student: Student): Observable<Student> {
    const url = `${this.apiUrl}/${student.id}`;
    return this.http.delete<Student>(url, httpOptions);
  }

  addMark(student: Student, mark: Mark) {
    const url = `${this.apiUrl}/${student.id}/marks`;
    return this.http.post<Mark>(url, mark, httpOptions);
  }

  editMark(student: Student, mark: Mark) {
    const url = `${this.apiUrl}/${student.id}/marks/${mark.id}`;
    return this.http.put<Mark>(url, mark, httpOptions);
  }

  deleteMark(student: Student, mark: Mark) {
    const url = `${this.apiUrl}/${student.id}/marks/${mark.id}`;
    return this.http.delete<Mark>(url, httpOptions);
  }
}
