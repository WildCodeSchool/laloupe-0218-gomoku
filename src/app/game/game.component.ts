import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public router: Router) { }

  ngOnInit() {
  }
  logOut() {
    this.authService.logout();
  }
}
