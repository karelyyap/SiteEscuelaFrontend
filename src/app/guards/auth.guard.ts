import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AutService } from "../services/auth-service";

export const authGuard: CanActivateFn = () => {
    const auth = inject(AutService);
    const router = inject(Router);

    return auth.isAutenticated() ? true : router.createUrlTree(['/login']);
}

export const guestGuard: CanActivateFn = () => {
    const auth = inject(AutService);
    const router = inject(Router);
    return auth.isAutenticated() ? router.createUrlTree(['/home']) : true;

} 