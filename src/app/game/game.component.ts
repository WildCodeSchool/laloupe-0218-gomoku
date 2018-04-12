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
  maxLenght;
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
              this.grid[i][y] = 0;
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

  // get me() {
  //   return this.room.players[this.myId];
  // }

  // get opponent() {
  //   return this.room.players[this.opponentId];
  // }

  // get myId(): string {
  //   return this.authService.user.uid;
  // }
  // get vsPlayerId(): string {
  //   if (Object.keys(this.room.players)[0] === this.myId) {
  //     return Object.keys(this.room.players)[1];
  //   }
  //   return Object.keys(this.room.players)[0];
  // }

  // get firstPlayer() {
  //   return this.room.players[Object.keys(this.room.players)[0]];
  // }

  // get secondPlayer() {
  //   return this.room.players[(Object.keys(this.room.players)[1])];
  // }

  updateRoom() {
    this.db.doc<Room>('rooms/' + this.roomId).update(this.room);
  }

  cellClicked(x, y): any {
    if (this.room.turn == this.authService.user.uid) {
      // console.log((this.room.gridLength * y) + x);
      if (this.room.players && this.room.turn) {
        this.room.grid[(y * this.room.gridLength) + x] = this.authService.user.uid;
        this.direction(x, y, 1);
        this.direction(x, y, 2);
        this.direction(x, y, 3);
        this.direction(x, y, 4);
        this.room.turn = this.opponentId;
        this.updateRoom();
        //this.whenClickedDisable(x,y);

      }
    }
  }

  direction(x, y, direction) {
    let maxLenght = 1;
    let maxCheck = 5;


    for (let index = 1; index < maxCheck; index++) {
      let xIndex = 0;
      let yIndex = 0;

      if (direction === 1) {
        xIndex = index;
      } else if (direction === 2) {
        yIndex = index;
      } else if (direction === 3) {
        yIndex = index;
        xIndex = - index;
      } else if (direction === 4) {
        yIndex = - index;
        xIndex = - index;
      }

      if (this.checkMine(x + xIndex, y + yIndex)) {
        maxLenght += 1;
      } else {
        break;
      }
      console.log('maxlength', maxLenght);
      if (maxLenght === 5) {
        alert('GG EZ');
      }
    }

    for (let index = 1; index < maxCheck; index++) {
      let xIndex = 0;
      let yIndex = 0;

      if (direction === 1) {
        xIndex = index;
      } else if (direction === 2) {
        yIndex = index;
      } else if (direction === 3) {
        yIndex = index;
        xIndex = - index;
      } else if (direction === 4) {
        yIndex = - index;
        xIndex = - index;
      }

      if (this.checkMine(x - xIndex, y - yIndex)) {
        maxLenght += 1;
      } else {
        break;
      }
      console.log('maxlength', maxLenght);
      if (maxLenght === 5) {
        alert('GG EZ');
      }
    }


    // if (this.room.grid[(myPosition - 1)] === this.authService.user.uid) {
    //   maxLenght = maxLenght + 1;
    // } else if (this.room.grid[(myPosition + 1)] === this.authService.user.uid) {
    //   maxLenght = maxLenght + 1;
    //   console.log(maxLenght);
    //   console.log(myPosition);
    //};
  }
  checkMine(x, y) {
    console.log(x, y);
    let myPosition = (y * this.room.gridLength) + x;
    if (this.room.grid[(myPosition)] === this.authService.user.uid) {
      return true;
    } else {
      return false;
    }
  }



  //isWon() {

  // if (maxLenght === 5) {
  //   console.log('you win');
  // }
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
