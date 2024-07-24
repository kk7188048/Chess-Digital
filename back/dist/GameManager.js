"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
const messages_1 = require("./messages");
const Game_1 = require("./Game");
class GameManager {
    constructor() {
        this.games = []; // Initialize games array
        console.log('Game started');
        this.pendingUser = null;
        this.users = [];
    }
    addUser(socket) {
        this.users.push(socket);
        this.handleMessage(socket);
    }
    removeUser(socket) {
        this.users = this.users.filter(user => user !== socket);
    }
    handleMessage(socket) {
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());
            if (message.type === messages_1.INIT_GAME) {
                if (this.pendingUser) {
                    // Start the game
                    const game = new Game_1.Game(this.pendingUser, socket);
                    this.games.push(game);
                    this.pendingUser = null;
                }
                else {
                    this.pendingUser = socket;
                }
            }
            if (message.type === messages_1.MOVE) {
                const game = this.games.find(game => game.Player1 === socket || game.Player2 === socket);
                game === null || game === void 0 ? void 0 : game.makeMove(socket, message.move);
            }
        });
        // Handle message
    }
}
exports.GameManager = GameManager;
