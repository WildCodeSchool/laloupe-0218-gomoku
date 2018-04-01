import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  title = 'GOMOKU';

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
  }
  loginGoogle() {
    this.authService.loginWithGoogle();
  }
}
