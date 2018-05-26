export class Mark {
  id: number;
  subject: string;
  value: number;
  weight: number;
  isBeingEdited: boolean;

  constructor(subject: string, mark: number, weight: number) {
    this.subject = subject;
    this.value = mark;
    this.weight = weight;
    this.isBeingEdited = false;
  }
}
