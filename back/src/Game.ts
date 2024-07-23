import WebSocket from 'ws';
import { MOVE } from './messages';
import {Chess} from "chess.js"
export class Game{
public Player1: WebSocket
    public Player2: WebSocket
    private board: Chess
    private moves: []
    private startTime: Date
    constructor(Player1: WebSocket, Player2: WebSocket){
        this.Player1 = Player1
        this.Player2 = Player2
        this.board = new Chess()
        this.moves = []
        this.startTime = new Date()
    }

    makeMove(socket: WebSocket, move: string){
        if(socket === this.Player1){
            this.Player2.send(JSON.stringify({type: MOVE, move: move}))
        }
        if(socket === this.Player2){
            this.Player1.send(JSON.stringify({type: MOVE, move: move}))
        }
    }
}