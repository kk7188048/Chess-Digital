import React, { useEffect, useState } from 'react'
import ChessBoard from '../components/ChessBoard'
import useSocket from '../hooks/useSockets'
import { Button } from '../components/Button'
export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_LOSE = "game_lose";
import {Chess} from "chess.js"

const Game = () => {
    const socket = useSocket()
    const[chess, setChess] =  useState(new Chess())
    const [board, setBoard] = useState(chess.board())
    

    useEffect(() => {
        if(!socket) return
        socket.onmessage = (event)=>{
            const message = JSON.parse(event.data)
            console.log(message)
            switch(message.type){
                case INIT_GAME:
                    setChess(new Chess())
                    setBoard(chess.board())
                    console.log()
                    break
                case MOVE:
                    const move = message.payload
                    chess.move(move)
                    setBoard(chess.board())
                    console.log("Move made")
                    break
                case GAME_LOSE:
                    break
            }

        }
    }, [socket])
    if (!socket) return <div>Connecting...</div>
    return (
        <div className='justify-center flex'>
            <div className='pt-8 max-w-screen-lg'>
                <div className='grid grid-cols-6 gap-4 md:grid-cols-2'>
                    <div className='col-span-4 bg-red-500 w-full'>
                        <ChessBoard chess={chess} setBoard={setBoard} socket={socket} board={board}/>
                    </div>
                </div>
                <div className='pt-8 col-span-2 bg-green-200 w-full flex justify-center'>
                    <Button onClick={() => socket.send(JSON.stringify({
                        type: INIT_GAME
                    }))
                    }>
                        Play
                    </Button>
                </div>
            </div>

        </div>
    )
}

export default Game
