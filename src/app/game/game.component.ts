import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PlayersService } from '../services/players.service';
import { Room } from '../models/room';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  grid;
  turn = 0;
  roomId;
  room: Room;
  opponentId;

  constructor(
    public authService: AuthService,
    public playersService: PlayersService,
    public router: Router,
    public route: ActivatedRoute,
    private db: AngularFirestore) { }


  ngOnInit() {
    
    this.roomId = this.route.snapshot.paramMap.get('id');
    this.db
      .doc<Room>('rooms/' + this.roomId)
      .valueChanges()
      .subscribe((room) => {
        this.room = room;
        if (!this.grid) {
          this.grid = [];
          for (let i = 0; i < this.room.gridLength; i++) {
            this.grid[i] = [];
            for (let y = 0; y < this.room.gridLength; y++) {
              this.grid[i][y] = 1;
            }
          }
        }
        for (let player of Object.keys(this.room.players)) {
          if (player !== this.authService.user.uid) {
            this.opponentId = player;
          }
        }
      });
  }

  get me() {
    return this.room.players[this.myId];
  }

  get opponent() {
    return this.room.players[this.opponentId];
  }

  get myId(): string {
    return this.authService.user.uid;
  }
  get vsPlayerId(): string {
    if (Object.keys(this.room.players)[0] === this.myId) {
      return Object.keys(this.room.players)[1];
    }
    return Object.keys(this.room.players)[0];
  }

  get firstPlayer() {
    return this.room.players[Object.keys(this.room.players)[0]];
  }

  get secondPlayer() {
    return this.room.players[(Object.keys(this.room.players)[1])];
  }

  updateRoom() {
    this.db.doc<Room>('rooms/' + this.roomId).update(this.room);
  }

  cellClicked(x, y): any {
    if (this.room.turn == this.authService.user.uid) {
        if (this.room.players && this.room.turn) {
      this.room.grid[(y * this.room.gridLength) + x] = this.authService.user.uid;
      this.room.turn = this.opponentId;
      this.updateRoom();
      //this.whenClickedDisable(x,y);
      this.updateRoom();
      console.log(this.room.turn);
    }
  }
   }
// whenClickedDisable(x, y){
//   if((this.room.grid[(y * this.room.gridLength) + x] == this.authService.user.uid) || (this.room.grid[(y * this.room.gridLength) + x] != this.authService.user.uid)){
//     this.cellClicked(x,y).disabled = true;
// }
// }
  getImg(x, y) {
    if (this.room.grid[(y * this.room.gridLength) + x] == "1") {
      return 'image-cropper1';
    } else if (this.room.grid[(y * this.room.gridLength) + x] == this.authService.user.uid) {
      return 'image-cropper2';
    } else if (this.room.grid[(y * this.room.gridLength) + x] != this.authService.user.uid) {
      return 'image-cropper3';
    }
  }

  logOut() {
    this.authService.logout();
  }
}
