import { User } from './player';

export class Room {
    players: User[];
    turn: number;
    winner: number;
}
