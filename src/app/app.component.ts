import {Component, ViewChild, ViewChildren} from '@angular/core';
import {Router} from '@angular/router';
import {TokenStorage} from './token.storage';
import {StudentListComponent} from './student-list/student-list.component';
import {StudentComponent} from './student/student.component';
import {Student} from './student';
import {CommunicatorService} from './communicator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  router: Router;
  title = 'student list Web-App';

  constructor(private _router: Router, private token: TokenStorage, private communicator: CommunicatorService) {
    this.router = _router;
  }

  signOut(): void {
    this.token.signOut();
    this.communicator.announceSignOut(true);
  }

  checkIsLogged(): boolean {
    return this.token.isLogged();
  }
}
