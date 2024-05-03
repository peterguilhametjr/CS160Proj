import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!isPlatformBrowser(this.platformId)) {
      // If not in the browser, perhaps log and redirect or handle otherwise
      console.error('Attempted to access sessionStorage in non-browser environment');
      return false;
    }

    const userData = sessionStorage.getItem('userData');
    if (!userData) {
      this.router.navigate(['/login']);
      return false;
    }

    const currentUser = JSON.parse(userData);
    const userId = next.paramMap.get('user_id');
    if (!userId) {
      this.router.navigate(['/unauthorized']);
      return false;
    }

    const requestedUserId = parseInt(userId, 10);
    console.log('Current User ID from session:', currentUser.user_id);
    console.log('Requested User ID from route:', requestedUserId);

    if (parseInt(currentUser.user_id, 10) === requestedUserId) {
      return true;
    } else {
      this.router.navigate(['/unauthorized']);
      return false;
    }
  }
}
