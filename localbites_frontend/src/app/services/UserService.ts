import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userIdSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  userId$: Observable<string | null> = this.userIdSubject.asObservable();

  setUserId(userId: string): void {
    this.userIdSubject.next(userId);
  }

  getUserId(): string | null {
    return this.userIdSubject.value;
  }
}
