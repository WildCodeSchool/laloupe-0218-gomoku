import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';


@Injectable()
export class AuthService {

    user: Observable<firebase.User>;

    constructor(
        public afAuth: AngularFireAuth,
        public router: Router) {

        // Get auth data, then get firestore user document || null
        this.user = afAuth.authState;
    }
    loginWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        this.afAuth.auth.signInWithPopup(provider)
            .then(value => {
                this.router.navigateByUrl('/game');
            })
            .catch(error => {
                console.log('Something went wrong: ', error);
            });
    }
    logout() {
        this.afAuth.auth.signOut()
            .then(value => {
                this.router.navigateByUrl('/connexion');
            })
            .catch(error => {
                console.log('Something went wrong: ', error);
            });
    }
}
