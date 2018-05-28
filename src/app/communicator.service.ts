import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class CommunicatorService {

  private signOutAnnouncedSource = new Subject<boolean>();

  signOutAnnounced$ = this.signOutAnnouncedSource.asObservable();

  announceSignOut(signOut: boolean) {
    this.signOutAnnouncedSource.next(signOut);
  }

  constructor() { }

}
