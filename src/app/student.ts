import {Mark} from '../app/mark';

export class Student {
  id: number;
  firstname: string;
  lastname: string;
  studentID: string;
  marks: Mark[];
  average: number;

  constructor(firstname: string, lastname: string, ID: string) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.studentID = ID;
    this.average = 0;
  }
}
