import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './guards/auth.guard';

export const routes: Routes = [

   {
      path: '',
      loadComponent: () => import('./pages/layout/layout').then(m => m.Layout),
      canActivate: [authGuard],
      children: [
         {
            path: 'home',
            canActivate: [authGuard],
            loadComponent: () => import('./pages/home/home').then((m) => m.Home)
         },

         {
            path: 'alumnos',
            canActivate: [authGuard],
            loadComponent: () => import('./pages/alumnos/alumnos').then((m) => m.Alumnos)
         },
         {
            path: 'maestros',
            canActivate: [authGuard],
            loadComponent: () => import('./pages/maestros/maestros').then((m) => m.Maestros)
         },
         {
            path: 'calificaciones',
            canActivate: [authGuard],
            loadComponent: () => import('./pages/calificaciones/calificaciones').then((m) => m.Calificaciones)
         },
         {
            path: 'usuarios',
            canActivate: [authGuard],
            loadComponent: () => import('./pages/usuarios/usuarios').then((m) => m.Usuarios)
         },

         {
            path: '',
            pathMatch:'full',
            redirectTo: 'home'
         }
      ]
   },

   {
      path: 'login',
      canActivate: [guestGuard],
      loadComponent: () => import('./pages/login/login').then((m) => m.Login)
   },

   {
      path: '**',
      redirectTo: 'login'
   }

];
