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
  // gridHeight;
  // gridWidth;
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
    /*if (this.playersService.players.length === 0) {
      this.router.navigate(['game']);
    }*/
    this.roomId = this.route.snapshot.paramMap.get('id');
    this.db
      .doc<Room>('rooms/' + this.roomId)
      .valueChanges()
      .subscribe((room) => {
        this.room = room;
        if (!this.grid){
          this.grid = [];
        for (let i = 0; i < this.room.gridLength; i++){
          this.grid[i] = [];
          for (let y = 0; y < this.room.gridLength; y++){
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
    // this.initGrid(); {
    // };
  }

  updateRoom() {
    this.db.doc<Room>('rooms/' + this.roomId).update(this.room);
  }

  cellClicked(x, y) {
    if (this.room.turn == this.authService.user.uid) {

      this.room.grid[(y*this.room.gridLength) + x] = this.authService.user.uid;
      this.room.turn = this.opponentId;
      this.updateRoom();
    }
    
  }


  getImg(x, y) {
    if (this.room.grid[(y*this.room.gridLength) + x] == "1") {
      return 'image-cropper1';
    } else if (this.room.grid[(y*this.room.gridLength) + x] == this.authService.user.uid) {
      return 'image-cropper2';
    } else if (this.room.grid[(y*this.room.gridLength) + x] != this.authService.user.uid) {
      return 'image-cropper3';
    }
   }
  // initGrid() {
  //   this.grid = [
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]
  //   ];
  // }

  logOut() {
    this.authService.logout();
  }
}
