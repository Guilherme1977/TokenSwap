import { Component, OnInit } from '@angular/core';
import { ResultService } from '../result.service'


@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss']
})
export class FinishComponent implements OnInit {

  constructor(
    private resultservice: ResultService
  ) { }
  result: any
  resultString: string
  link: string
  block: string
  ngOnInit(): void {
      this.result = this.resultservice.result
      let status = this.result.status
      if (status == 'failed') {
          this.resultString = 'Filling order could have failed. Check your receiving account or contact banfarm@protonmail.com.'
      } else {
        let pre = ''
        if (status == 'filled') {
          pre = 'Filled order by sending '
        }
        else if (status == 'refund') {
          pre = 'Received amount below minimum or above maximum amount. To try again, go back to the home page and get a new address. Refunding of '
        } 
          let divider = (this.result.coin_send == 'nano') ? 1e30 : 1e29
          let amount = (this.result.amount_send / divider).toPrecision(6)
          this.resultString = `${pre} ${amount} ${this.result.coin_send.toUpperCase()} to account ${this.result.destination}.`
          let url = (this.result.coin_send == 'nano') ? 'https://nanolooker.com/block/' : 'https://creeper.banano.cc/explorer/block/'
          this.link = url + this.result.block
      }
      
  }

}
