import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  result: { status: string, amount_send: string, coin_send: string, destination: string, block: string }
  
  constructor() {
  }

}
