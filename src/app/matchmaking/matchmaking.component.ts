import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';

import { Room } from '../../models/room';
import { User } from '../../models/player';

@Component({
  selector: 'app-matchmaking',
  templateUrl: './matchmaking.component.html',
  styleUrls: ['./matchmaking.component.css']
})
export class MatchmakingComponent implements OnInit {

  constructor(private db: AngularFirestore,
    private router: Router,
    public authService: AuthService) { }

  ngOnInit() {
    this.getRooms();
  }
  getRooms() {
    const roomsCollection = this.db.collection<Room>('rooms');

    const snapshot = roomsCollection.snapshotChanges().subscribe((snapshot) => {
      const user = new User();
      user.displayName = user.displayName;

      for (const snapshotItem of snapshot) {
        const roomId = snapshotItem.payload.doc.id;
        const room = snapshotItem.payload.doc.data() as Room;
        if (room.players.length === 1) {
          room.players.push(user);
          this.db.doc('rooms/' + roomId).update(JSON.parse(JSON.stringify(room)));
          this.router.navigate(['game', roomId, user.name]);
          return;
        }
      }
      const room = new Room();
      room.players = [user];
      this.db.collection('rooms')
        .add(JSON.parse(JSON.stringify(room)))
        .then((doc) => {
          this.router.navigate(['game', doc.id, user.name]);
        });
    });
  }
}
