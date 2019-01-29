import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class RouterService implements CanActivate {

    constructor(
        private auth: AuthService,
        private router: Router,
        private user: UserService
    ) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ): Observable<boolean>|Promise<boolean>|boolean {
        const expectedRole = route.data.expectedRole;
        console.log(!this.auth.isAuthenticated());
        if (!this.auth.isAuthenticated()) {
            this.router.navigate(['/login']);
            return false;
        } 
        return true;
    }
    public navigateToHomePage() {
        this.router.navigate(['/404']);
    }

    public navigateToLoginPage() {
        this.router.navigate(['/login']);
    }
}
