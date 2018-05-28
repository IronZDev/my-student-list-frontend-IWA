import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {Student} from '../student';
import {StudentService} from '../student.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TokenStorage} from '../token.storage';
import {Subscription} from 'rxjs/Subscription';
import {CommunicatorService} from '../communicator.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit, OnDestroy {
  addStudentForm: FormGroup;
  students: Student[];
  showAddStudent: boolean;
  communicatorSubscription: Subscription;

  // ngOnChanges(changes: SimpleChanges) {
  //   if (!this.checkIsLogged()) {
  //     this.showAddStudent = false;
  //   }
  // }

  constructor(private studentService: StudentService, private fb: FormBuilder, private token: TokenStorage, private communicator: CommunicatorService) {
    this.createForm();
    this.showAddStudent = false;
    this.communicatorSubscription = communicator.signOutAnnounced$.subscribe(signOut => {
      this.showAddStudent = false;
    });
  }

  createForm() {
    this.addStudentForm = this.fb.group({
      firstname: ['', Validators.required],
      surname: ['', Validators.required],
      studentID: ['', Validators.compose([Validators.required, Validators.min(10000), Validators.max(99999)])]
    });
  }
  ngOnInit() {
    this.studentService.getStudents().subscribe(
      (s) => {
        this.students = s;
        for (let student of this.students) {
          for (let mark of student.marks) {
            mark.isBeingEdited = false;
          }
          if (student.marks.length === 0) {
            student.average = 0;
          }
        }
      },
      err => {
        console.log(err);
      },
      () => {
        console.log('completed');
        console.log(this.students);
      }
    );
  }

  ngOnDestroy() {
    this.communicatorSubscription.unsubscribe();
  }

  addStudentPanel() {
    this.showAddStudent = !this.showAddStudent;
  }

  addStudent(firstname: string, lastname: string, ID: HTMLInputElement) {
    this.studentService.addStudent(new Student(firstname, lastname, ID.value)).subscribe(s => {
      s.average = 0;
      this.students.push(s);
    });
    this.showAddStudent = !this.showAddStudent;
  }

  studentDeleted(student: Student) {
    const index: number = this.students.indexOf(student);
    if (index !== -1) {
      this.students.splice(index, 1);
    }
  }

  checkIsLogged(): boolean {
    return this.token.isLogged();
  }
}
