import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PlayersService } from '../services/players.service';
import { Room } from '../models/room';
import { AngularFirestore } from 'angularfire2/firestore';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Player } from '../models/player';

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
  maxLenght;
  constructor(
    public authService: AuthService,
    public playersService: PlayersService,
    public router: Router,
    public route: ActivatedRoute,
    private db: AngularFirestore,
    private modalService: NgbModal) { }

  openVerticallyCenteredWin(contentWin) {
    this.modalService.open(contentWin, { centered: true });
  }
  openVerticallyCenteredLoose(contentLoose) {
    this.modalService.open(contentLoose, { centered: true });
  }
  ngOnInit() {

    this.roomId = this.route.snapshot.paramMap.get('id');
    this.db
      .doc<Room>('rooms/' + this.roomId)
      .valueChanges()
      .subscribe((room) => {
        this.room = room;
        if (this.me && this.me.win) {
          console.log('win');
          const element: HTMLElement = document.getElementById('triggerModal') as HTMLElement;
          element.click();
        }
        if (this.opponent && this.opponent.win) {
          console.log('loose');
          const element: HTMLElement = document.getElementById('looseModal') as HTMLElement;
          element.click();
        }
        if (!this.grid) {
          this.grid = [];
          for (let i = 0; i < this.room.gridLength; i += 1) {
            this.grid[i] = [];
            for (let y = 0; y < this.room.gridLength; y += 1) {
              this.grid[i][y] = 0;
            }
          }
        }
      });
  }

  updateRoom() {
    console.log(this.room);
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
        console.log(this.room);
        this.updateRoom();
        //this.whenClickedDisable(x,y);

      }
    }
  }
  get me(): Player {
    return this.room.players[this.authService.user.uid];
  }

  get opponent(): Player {
    return this.room.players[this.opponentId];
  }


  get opponentId(): string {
    if (Object.keys(this.room.players)[0] === this.authService.user.uid) {
      return Object.keys(this.room.players)[1];
    }
    return Object.keys(this.room.players)[0];
  }

  direction(x, y, direction) {
    let maxLenght = 1;
    let maxCheck = 5;


    for (let index = 1; index < maxCheck; index += 1) {
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
      // if (maxLenght === 5 && (Object.keys(this.room.players)[0] === this.authService.user.uid)) {
      //   const element: HTMLElement = document.getElementById('triggerModal') as HTMLElement;
      //   element.click();
      // } else if (maxLenght === 5 && (Object.keys(this.room.players)[1] === this.authService.user.uid)) {
      //   const element: HTMLElement = document.getElementById('looseModal') as HTMLElement;
      //   element.click();
      // }
      if (maxLenght === 5) {
        // const element: HTMLElement = document.getElementById('triggerModal') as HTMLElement;
        // element.click();
        this.me.win = true;
        // const element: HTMLElement = document.getElementById('triggerModal') as HTMLElement;
        // element.click();
        this.updateRoom();
      } this.me.win = false;
    }

    for (let index = 1; index < maxCheck; index += 1) {
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
        // const element: HTMLElement = document.getElementById('triggerModal') as HTMLElement;
        // element.click();
        this.me.win = true;
        this.updateRoom();
      }

      //   if (maxLenght === 5 && (Object.keys(this.room.players)[0] === this.authService.user.uid)) {
      //     const element: HTMLElement = document.getElementById('triggerModal') as HTMLElement;
      //     element.click();
      //   } else if (maxLenght === 5 && (Object.keys(this.room.players)[1] === this.authService.user.uid)) {
      //     const element: HTMLElement = document.getElementById('looseModal') as HTMLElement;
      //     element.click();
      //   }
    }
  }

  checkMine(x, y) {
    let myPosition = (y * this.room.gridLength) + x;
    if (this.room.grid[(myPosition)] === this.authService.user.uid) {
      return true;
    }
    return false;
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
    if (Number(this.room.grid[(y * this.room.gridLength) + x]) === 1) {
      return 'image-cropper1';
    }
    if (this.room.grid[(y * this.room.gridLength) + x] == this.authService.user.uid) {
      return 'image-cropper2';
    }
    if (this.room.grid[(y * this.room.gridLength) + x] != this.authService.user.uid) {
      return 'image-cropper3';
    }
  }

  getImgUrl(x, y) {
    if (this.checkMine(x, y)) {
      let img = localStorage.getItem('pion_img');
      if (img) {
        return 'url(\'assets/img/' + img + '\')';
      }
      return 'url(\'assets/img/black_pion.png\')';
    }
  }

  logOut() {
    this.authService.logout();
  }
}
