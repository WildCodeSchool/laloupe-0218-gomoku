import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent implements OnInit {
  scores;
  constructor(public router: Router, public authService: AuthService) { }
  ngOnInit() {

  }

  imgSelected(img) {
    localStorage.setItem('pion_img', img);
    console.log(localStorage.getItem('pion_img'));
  }

  goBack() {
    window.history.back();
  }
}
