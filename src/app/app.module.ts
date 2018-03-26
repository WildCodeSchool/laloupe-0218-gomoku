import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ConnexionComponent } from './connexion/connexion.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth.service';
var config = {
  apiKey: "AIzaSyBPcNBKJr3PtrgE92Txxe3woaEc75CpsNI",
  authDomain: "gomoku-projet-2.firebaseapp.com",
  databaseURL: "https://gomoku-projet-2.firebaseio.com",
  projectId: "gomoku-projet-2",
  storageBucket: "gomoku-projet-2.appspot.com",
  messagingSenderId: "1001534234475"
};
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ConnexionComponent
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    AngularFireModule.initializeApp(config),
    //AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AppRoutingModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
