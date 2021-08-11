import { CheckoutComponent } from './component/checkout/checkout.component';
import { MyordersComponent } from './component/myorders/myorders.component';
import { MycartComponent } from './component/mycart/mycart.component';
import { AuthGuard } from './services/auth/auth.guard';
import { NavbarComponent } from './component/navbar/navbar.component';
import { HomeComponent } from './component/home/home.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/auth/login/login.component';
import { RegistrationComponent } from './component/auth/registration/registration.component';

const routes: Routes = [
 
  { path: 'home', component: HomeComponent, pathMatch:'full'},
  { path : 'mycart', component : MycartComponent , pathMatch:'full' },
  { path: 'login', component: LoginComponent ,pathMatch:'full'},
  { path: 'signup', component: RegistrationComponent ,pathMatch:'full'},
  { path : 'myorders' ,component : MyordersComponent, pathMatch:'full'},
  { path : 'checkout' , component: CheckoutComponent , pathMatch: 'full'}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
