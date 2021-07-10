import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { PriceService } from '../price.service';
import { ResultService } from '../result.service'
import { Subscription } from 'rxjs'
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss']
})
export class SendComponent implements OnInit {

  rates: any
  private _priceSub: Subscription

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private socket: Socket,
    private resultservice: ResultService,
    private priceService: PriceService,
    private _snackBar: MatSnackBar
  ) { }

  tradePossible = true
  trade: string;
  coin: string;
  max = 0
  min = 0
  account_server = '...';
  timer = 180

  ngOnInit(): void {
    var countdown = setInterval(() => {
      if (this.timer == 0) {
        clearInterval(countdown)
      } else {
        this.timer--
      }
    }, 1000)
      this.route.paramMap.subscribe(params => {
      this.trade = params.get('trade')!;
      // console.log(`send_comp: ${this.trade}`)
    });
    if (this.trade == 'buy') {
      this.coin = 'NANO'
    } else {
      this.coin = 'BANANO'
    }

    this._priceSub = this.priceService.rates.subscribe(rates => {
      this.rates = rates
      if (this.trade == 'buy') {
        this.max = Math.round(this.rates.max.Banano / this.rates.buy * 100)/100
        this.min = this.rates.min.Nano       
      } else {
        this.max = Math.round(this.rates.max.Nano * this.rates.sell)
        this.min = this.rates.min.Banano
      }
      this.tradePossible = (this.min < this.max) ? true : false
    })

    // this.socket.emit('getAddress')
    this.socket.on('account_server', (account_server: string) => {
      this.account_server = account_server;
      console.log('Server account: ' + account_server)
    })

    this.socket.on('result', (result: any) => {
      this.resultservice.result = result 
      // console.log('Send: Resultservice result: ' + this.resultservice.result + 'result: ' + result)
      this.router.navigate([this.trade + '/finish'])
    })
  }

  openSnackBar() {
    this._snackBar.open('Copied address to clipboard.',void 0, {
      duration: 1500
    })
  }
}