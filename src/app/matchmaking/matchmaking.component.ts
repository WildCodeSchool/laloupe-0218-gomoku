import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { Player } from './../models/player';
import { Room } from './../models/room';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import { Subscription } from 'rxjs/Rx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-matchmaking',
  templateUrl: './matchmaking.component.html',
  styleUrls: ['./matchmaking.component.css']
})
export class MatchmakingComponent implements OnInit {
  private authSubscription: Subscription;
gridLength = 19;
  constructor(
    private authService: AuthService,
    private db: AngularFirestore,
    private router: Router) { }

  ngOnInit() {
    this.authSubscription = this.authService.authState.take(1).subscribe((user) => {
      if (user) {
        this.getRooms();
      }
    });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  getRooms() {
    const roomsCollection = this.db.collection<Room>('rooms');

    const snapshot = roomsCollection.snapshotChanges().take(1).subscribe((snapshot) => {
      const player = new Player();
      player.name = this.authService.user.displayName;

      for (const snapshotItem of snapshot) {
        const roomId = snapshotItem.payload.doc.id;
        const room = snapshotItem.payload.doc.data() as Room;

        if (Object.keys(room.players).length === 1) {
          room.players[this.authService.user.uid] = player;
          this.db.doc('rooms/' + roomId).update(JSON.parse(JSON.stringify(room)));
          this.router.navigate(['game', roomId]);
          return;
        }
      }

      const room = new Room();
      room.players = {};
      room.grid = Array.apply(null, Array(this.gridLength*this.gridLength)).map(Number.prototype.valueOf,1);
      room.gridLength = this.gridLength;
      room.turn = this.authService.user.uid;
      room.players[this.authService.user.uid] = player;
      console.log(room);
      this.db.collection('rooms')
        .add(JSON.parse(JSON.stringify(room)))
        .then((doc) => {
          this.router.navigate(['game', doc.id]);
        });
    });
  }
}