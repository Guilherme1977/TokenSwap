import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { Socket } from 'ngx-socket-io'
import { AuthService } from './auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private router: Router,
    private socket: Socket,
    private authService: AuthService
  ) {}
  title = 'ban.farm';
  ngOnInit() {
    if (!this.socket.ioSocket.connected) {
      this.router.navigate(['/maintenance'])
    }
    this.socket.on('maintenance', (isOn: boolean) => {
      this.authService.inMaintenance = isOn 
      if (isOn) {
        this.router.navigate(['/maintenance'])
      } else {
        this.router.navigate(['/'])
      }
    })
  }
}
