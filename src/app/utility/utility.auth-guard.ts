import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (sessionStorage.getItem('access_token')) {
            if (route.data.roles) {
                let flag = false;
                var roles = route.data.roles;
                roles.forEach(element => {
                    if (sessionStorage.getItem('role').includes(element)) {
                        flag = true;
                        return true;
                    }
                });
                if (flag) {
                    return true;
                } else {
                    this.router.navigate(['error/403']);
                    return false;
                }
            }
            return true;
        }
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}