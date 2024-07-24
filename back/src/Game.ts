import WebSocket from 'ws';
import { GAME_OVER, INIT_GAME, MOVE } from './messages';
import {Chess} from "chess.js"
export class Game{
public Player1: WebSocket
    public Player2: WebSocket
    private board: Chess
    private moves: []
    private startTime: Date
    private moveCount = 0
    constructor(Player1: WebSocket, Player2: WebSocket){
        this.Player1 = Player1
        this.Player2 = Player2
        this.board = new Chess()
        this.moves = []
        this.startTime = new Date()
        this.Player1.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color:"white"
            }
            
        }))
        this.Player2.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color:"black"
            }
            
        }))
    }

    makeMove(socket: WebSocket, move:{
        from: string
        to: string
    })
    {
        if(this.moveCount%2 === 0 && socket === this.Player1){
            return
        }
        if(this.moveCount%2 === 1 && socket === this.Player2){
            return
        }
        try {
            this.board.move(move)
               
        } catch (error) {
            
        }
        if(this.board.isGameOver()){
            this.Player1.send(JSON.stringify({
                type:GAME_OVER,
                payload:{
                    winner: this.board.turn()==="w"?"black":"white"
                }
            }))
            this.Player2.send(JSON.stringify({
                type:GAME_OVER,
                payload:{
                    winner: this.board.turn()==="w"?"black":"white"
                }
            })) 
            return
            }
            if(this.moveCount%2 === 0){
                //The length of the moves array is used to determine whose turn it is. The idea is to count the total number of moves made so far.
//If the number of moves is even (% 2 === 0), it implies that it is White's turn to move because the game starts with White.
                
                this.Player1.send(JSON.stringify({
                    type:MOVE,
                    payload:move
                }))
                
            } else{
                this.Player2.send(JSON.stringify({
                    type:MOVE,
                    payload:move      
                }))
            }
            
            this.moveCount++ 
    }
    
}