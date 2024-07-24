import WebSocket from 'ws';
import { INIT_GAME, MOVE } from './messages';
import { Game } from './Game';

export class GameManager {
    private games: Game[];
    private pendingUser: WebSocket | null;
    private users: WebSocket[];

    constructor() {
        this.games = []; // Initialize games array
        console.log('Game started');
        this.pendingUser = null;
        this.users = [];
    }

    addUser(socket: WebSocket){
        this.users.push(socket)
        this.handleMessage(socket)
        
    }
    removeUser(socket: WebSocket) {
        this.users = this.users.filter(user => user !== socket)
        
    }

    private handleMessage(socket:WebSocket){
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());
            if(message.type === INIT_GAME) {
                if(this.pendingUser){
// Start the game
                    const game = new Game(this.pendingUser, socket);
                    this.games.push(game);
                    this.pendingUser = null;
                } else{
                    this.pendingUser = socket
                }

            }
            if(message.type === MOVE) {
                const game = this.games.find(game => game.Player1 === socket || game.Player2 === socket);
                game?.makeMove(socket, message.payload.move);
            }

        })
        // Handle message
    }
}

