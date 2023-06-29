import {inject} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn, Route, Router,
  RouterStateSnapshot, UrlSegment,
} from '@angular/router';
import {Observable, tap} from 'rxjs';
import {AuthService} from "../services/auth.service";

const checkAuthStatus = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuthentication().pipe(
    tap((isAuth) => {
      if (!isAuth) router.navigate(['./auth/login']);
    })
  );
};

export const authCanMatch: CanMatchFn
  = (route: Route, urlSegments: UrlSegment[]) => checkAuthStatus();

export const authCanActivate: CanActivateFn =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => checkAuthStatus();
