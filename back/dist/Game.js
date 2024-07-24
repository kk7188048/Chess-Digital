"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const messages_1 = require("./messages");
const chess_js_1 = require("chess.js");
class Game {
    constructor(Player1, Player2) {
        this.Player1 = Player1;
        this.Player2 = Player2;
        this.board = new chess_js_1.Chess();
        this.moves = [];
        this.startTime = new Date();
        this.Player1.send(JSON.stringify({
            type: messages_1.INIT_GAME,
            payload: {
                color: "white"
            }
        }));
        this.Player2.send(JSON.stringify({
            type: messages_1.INIT_GAME,
            payload: {
                color: "black"
            }
        }));
    }
    makeMove(socket, move) {
        if (this.board.moves().length % 2 === 0 && socket === this.Player1) {
            return;
        }
        if (this.board.moves().length % 2 === 1 && socket === this.Player2) {
            return;
        }
        try {
            this.board.move(move);
        }
        catch (error) {
        }
        if (this.board.isGameOver()) {
            this.Player1.emit(JSON.stringify({
                type: messages_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white"
                }
            }));
            this.Player2.emit(JSON.stringify({
                type: messages_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white"
                }
            }));
            return;
        }
        if (this.board.moves().length % 2 === 0) {
            //The length of the moves array is used to determine whose turn it is. The idea is to count the total number of moves made so far.
            //If the number of moves is even (% 2 === 0), it implies that it is White's turn to move because the game starts with White.
            this.Player1.emit(JSON.stringify({
                type: messages_1.MOVE,
                payload: move
            }));
        }
        else {
            this.Player2.emit(JSON.stringify({
                type: messages_1.MOVE,
                payload: move
            }));
        }
    }
}
exports.Game = Game;
