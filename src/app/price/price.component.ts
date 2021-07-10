import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs'
import { MaintenanceViewComponent } from '../maintenance-view/maintenance-view.component';
import { AuthService } from '../auth.service'

import { PriceService } from '../price.service'

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent implements OnInit {
  rates = {buy: 0.19, sell: 6969, max: {Nano: 0, Banano: 0}, min: {Nano: 0, Banano: 0}}
  private _priceSub: Subscription;

  constructor(private priceService: PriceService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this._priceSub = this.priceService.rates.subscribe(rates => {
        this.rates = rates
    });
    // setInterval(() => {
    //   if (this.authService.inMaintenance) {
    //     this.rates = {buy: 0.19, sell: 6969, max: {Nano: 0, Banano: 0}}
    //   }
    // }, 1000)
  }
}
