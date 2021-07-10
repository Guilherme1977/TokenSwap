import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import isValid from 'nano-address-validator';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.scss']
})
export class TradeComponent implements OnInit {

  constructor(
    private socket: Socket,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  
  trade: string;
  addressType: string;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.trade = params.get('trade')!
      // console.log(`trade_comp: ${this.trade}`)
    });
    if (this.trade == 'buy') {
      this.addressType = 'BANANO'
    } else if (this.trade == 'sell') {
      this.addressType = 'NANO'
    } else {
      this.router.navigate([''])
    }
  }

  address = '';
  hover: boolean;
  showInvalid = false;

  validate() {
    if (this.trade == 'buy') {
      return isValid(this.address, 'ban')
    } else {
      return isValid(this.address)
    }
  }

  submit() {
    this.socket.emit('order', this.address, this.trade)
    this.router.navigate([this.trade + '/send'])
  }

  enter() {
    if (this.validate()) {
      this.submit()
    }
  }
}

