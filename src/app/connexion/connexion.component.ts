import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }
  loginGoogle() {
    this.authService.googleLogin();
  }
}
