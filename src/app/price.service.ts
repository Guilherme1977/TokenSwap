import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class PriceService {
  
  rates = this.socket.fromEvent<any>('rates');
  
  constructor(private socket: Socket) { }

}
