import {map, Observable, tap} from "rxjs";
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment
} from "@angular/router";

const checkPublicStatus = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuthentication().pipe(
    tap((isAuth) => {
      if (isAuth) router.navigate(['./heroes']);
    }),
    map(isAuth => !isAuth),
  );
};

export const publicCanMatch: CanMatchFn
  = (route: Route, urlSegments: UrlSegment[]) => checkPublicStatus();

export const publicCanActivate: CanActivateFn =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => checkPublicStatus();
