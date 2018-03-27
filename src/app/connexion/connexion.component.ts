import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  error: any;
  socialError: any;

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit() {
  }
  loginGoogle() {
    this.authService.googleLogin()
      .then(() => {
        this.router.navigate(['/game']);
      })
      .catch(error => {
        this.socialError = error;
        console.log('Error while signing in with Google: ', error.message);
      });;
  }
}
