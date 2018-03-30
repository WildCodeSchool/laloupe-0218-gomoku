import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { FooterComponent } from './footer/footer.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { GameComponent } from './game/game.component';
import { ProfilComponent } from './profil/profil.component';


import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/auth.service';
import { StatsService } from './services/stats.service';

const config = {
  apiKey: 'AIzaSyBPcNBKJr3PtrgE92Txxe3woaEc75CpsNI',
  authDomain: 'gomoku-projet-2.firebaseapp.com',
  databaseURL: 'https://gomoku-projet-2.firebaseio.com',
  projectId: 'gomoku-projet-2',
  storageBucket: 'gomoku-projet-2.appspot.com',
  messagingSenderId: '1001534234475'
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ConnexionComponent,
    LandingPageComponent,
    GameComponent,
    FooterComponent,
    ProfilComponent,
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    AngularFireModule.initializeApp(config),
    // AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
/*     AngularFireDatabase,
 */    AppRoutingModule,
  ],
  providers: [AuthService, StatsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
