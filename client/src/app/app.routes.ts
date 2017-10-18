import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './_authentication/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth-guard.service';

const appRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }
]

export const appRouting = RouterModule.forRoot(appRoutes);
