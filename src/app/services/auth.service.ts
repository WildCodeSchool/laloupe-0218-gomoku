import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { StatsService } from './stats.service';

@Injectable()
export class AuthService {
    constructor(
        private afAuth: AngularFireAuth,
        private router: Router, public sts: StatsService) { }
    get currentUser() {
        return this.afAuth.auth.currentUser;
    }
    googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();
        return this.oAuthLogin(provider)
            .then(value => {
                console.log('Sucess', value),
                    console.log('The given name is ' + value.additionalUserInfo.profile.given_name),
                    this.router.navigateByUrl('/profile');
            })
            .catch(error => {
                console.log('Something went wrong: ', error);
            });
    }
    signInWithFacebook() {
        this.deleteIfAnonymous();
        return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    }
    deleteIfAnonymous() {
        if (this.afAuth.auth.currentUser && this.afAuth.auth.currentUser.isAnonymous) {
            this.sts.unsubscribe();
            this.afAuth.auth.currentUser.delete();
        }
    }
    logout() {
        this.afAuth.auth.signOut().then(() => {
            this.router.navigate(['/']);
        });
    }
    private oAuthLogin(provider) {
        return this.afAuth.auth.signInWithPopup(provider);
    }
}
