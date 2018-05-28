import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Student} from '../student';
import {Mark} from '../mark';
import {StudentService} from '../student.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TokenStorage} from '../token.storage';
import {CommunicatorService} from '../communicator.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit, OnDestroy {
  @Input() student: Student;
  showAddMark: boolean;
  showAllMarks: boolean;
  @Output() studentDeleted: EventEmitter<Student>;
  editMarkForm: FormGroup;
  communicatorSubscription: Subscription;

  constructor(private studentService: StudentService, private fb: FormBuilder, private token: TokenStorage, private communicator: CommunicatorService) {
    this.showAddMark = false;
    this.showAllMarks = false;
    this.studentDeleted = new EventEmitter<Student>();
    this.createForm();
    this.communicatorSubscription = communicator.signOutAnnounced$.subscribe(signOut => {
      this.showAddMark = false;
      this.resetEditStates();
    });
  }

  createForm() {
    this.editMarkForm = this.fb.group({
      subject: ['', Validators.required],
      mark: ['', Validators.compose([Validators.required, Validators.min(1), Validators.max(6)])],
      weight: ['', Validators.compose([Validators.required, Validators.min(1), Validators.max(5)])]
    });
  }

  ngOnInit() {
    if (this.student.marks.length > 0) {
      this.calculateAverage();
    }
  }

  ngOnDestroy() {
    this.communicatorSubscription.unsubscribe();
  }

  toggleAddMark() {
    this.showAddMark = !this.showAddMark;
  }

  toggleAllMarks() {
    this.showAllMarks = !this.showAllMarks;
  }

  removeStudent() {
    this.studentService.deleteStudent(this.student).subscribe(() => this.studentDeleted.emit(this.student));
  }

  resetEditStates(): boolean {
    for (let mark of this.student.marks) {
      mark.isBeingEdited = false;
    }
    return false;
  }

  addMark(subject: HTMLInputElement, mark: HTMLInputElement, weight: HTMLInputElement): boolean {
    this.studentService.addMark(this.student, new Mark(subject.value, parseFloat(mark.value), parseInt(weight.value, 10))).subscribe(
      newMark => {
        newMark.isBeingEdited = false;
        this.student.marks.push(newMark);
        this.calculateAverage();
      }
    );
    return false;
  }

  editMark(mark: Mark, subject: HTMLInputElement, newMarkVal: HTMLInputElement, weight: HTMLInputElement): boolean {
    let tempMark = new Mark(subject.value, parseFloat(newMarkVal.value), parseInt(weight.value, 10));
    tempMark.id = mark.id;
    this.studentService.editMark(this.student, tempMark).subscribe(
      newMark => {
        newMark.isBeingEdited = false;
        this.student.marks[this.student.marks.indexOf(mark)] = newMark;
        this.calculateAverage(); }
    );
    return false;
  }

  deleteMark(mark: Mark): boolean {
    this.studentService.deleteMark(this.student, mark).subscribe(
      () => {
        const index: number = this.student.marks.indexOf(mark);
        if (index !== -1) {
          this.student.marks.splice(index, 1);
        }
        this.calculateAverage(); }
    );
    return false;
  }

  calculateAverage() {
    let markSum = 0;
    let weightSum = 0;
    if (this.student.marks.length === 0) {
      this.student.average = 0;
      return;
    }
    for (let mark of this.student.marks) {
      markSum += mark.value * mark.weight;
      weightSum += mark.weight;
    }
    this.student.average = markSum / weightSum;
    this.student.average = Math.round(this.student.average * 100) / 100;
    this.student.average.toFixed(2);
  }

  toggleEditState(mark: Mark) {
    mark.isBeingEdited = !mark.isBeingEdited;
  }

  checkIsLogged(): boolean {
    return this.token.isLogged();
  }
}
