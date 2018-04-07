import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
/* import { AngularFirestore } from 'angularfire2/firestore';
 */import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

/* interface User {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
} */

@Injectable()
export class AuthService {

    user: Observable<firebase.User>;

    constructor(
        public afAuth: AngularFireAuth,
/*         public afs: AngularFirestore,
 */        public router: Router) {

        // Get auth data, then get firestore user document || null
        this.user = afAuth.authState;
        /* this.user = afAuth.authState
            .switchMap(user => {
                if (user) {
                    return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
                } else {
                    return Observable.of(null);
                }
            }); */
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
    /* 
    loginWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        return this.oAuthLogin(provider);
    } *//* 
    private oAuthLogin(provider) {
        return this.afAuth.auth.signInWithPopup(provider)
            .then(value => {
                this.updateUserData(credential.user)
                this.router.navigateByUrl('/matchmaking');
            })
            .catch(error => {
                console.log('Something went wrong: ', error);
            });
    }
    private updateUserData(user) {
        // Sets user data to firestore on login
        const userRef: AngularFirestoreDocument<user> = this.afs.doc(`users/${user.uid}`);

        const data: User = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL
        }
        return userRef.set(data)
    } */
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
