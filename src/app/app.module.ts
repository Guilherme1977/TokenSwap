import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TradeComponent } from './trade/trade.component';
import { HomeComponent } from './home/home.component';
import { PriceComponent } from './price/price.component';
import { SendComponent } from './send/send.component';
import { QRCodeModule } from 'angularx-qrcode';
import { FinishComponent } from './finish/finish.component';
import { AuthGuardService } from './auth-guard.service';
import { MaintenanceViewComponent } from './maintenance-view/maintenance-view.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const config: SocketIoConfig = { url: 'https://ban.farm:2053', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    TradeComponent,
    HomeComponent,
    PriceComponent,
    SendComponent,
    FinishComponent,
    MaintenanceViewComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SocketIoModule.forRoot(config),
    QRCodeModule,
    BrowserAnimationsModule,
    ClipboardModule,
    MatSnackBarModule
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
