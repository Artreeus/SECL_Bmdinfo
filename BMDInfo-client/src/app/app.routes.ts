import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardUiComponent } from './dashboard/dashboard-ui/dashboard-ui.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '',  title: 'Login Page', component: LoginComponent},
  { path: 'login',  title: 'Login Page', component:  LoginComponent},
  { path: 'register',  title: 'Register', component:  RegisterComponent},

  { 
    path: 'dashboard',  
    title: 'Dashboard', 
    component:  DashboardComponent,
    canActivate: [authGuard],
    
    children: [
      {
        path: '',
        title: 'Dashboard',
        component: DashboardUiComponent
      },
      {
        path: 'dashboard',
        title: 'Dashboard',
        component: DashboardUiComponent
      },
      {
        path: 'bid-tracker',
        title: 'Bid Tracker',
        component: DashboardUiComponent
      }

    ]

},
];
