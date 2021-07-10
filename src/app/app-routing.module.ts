import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TradeComponent } from './trade/trade.component';
import { SendComponent } from './send/send.component';
import { FinishComponent } from './finish/finish.component';
import { AuthGuardService } from './auth-guard.service';
import { MaintenanceViewComponent } from './maintenance-view/maintenance-view.component'
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component'

const routes: Routes = [
  {
    path: '', 
    component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'maintenance', component: MaintenanceViewComponent },
  { 
    path: ':trade', 
    component: TradeComponent, canActivate: [AuthGuardService] },
  { 
    path: ':trade/send',
    component: SendComponent, canActivate: [AuthGuardService] },
  { 
    path: ':trade/finish',
    component: FinishComponent, canActivate: [AuthGuardService] },
  {path:"**",component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
