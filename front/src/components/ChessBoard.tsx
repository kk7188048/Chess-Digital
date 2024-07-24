import React from 'react';
import { Color, PieceSymbol, Square } from 'chess.js';
import { MOVE } from '../screens/Game';

const ChessBoard = ({ board, socket, setBoard, chess }: {
    setBoard: any
    chess: any
    board: ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][];
    socket: WebSocket;
}) => {
    const [from, setFrom] = React.useState<Square | null>(null);
    const [to, setTo] = React.useState<Square | null>(null);

    return (
        <div className='text-white-200'>
            {board.map((row, i) => (
                <div key={i} className='flex justify-center'>
                    {row.map((square, j) => {
                        const squareRepresentation = String.fromCharCode(97 + (j % 8)) + "" + (8 - i) as Square;
                        return (
                            <div
                                onClick={() => {
                                    if (!from) setFrom(squareRepresentation);
                                    else {
                                        socket.send(JSON.stringify({
                                            type: MOVE,
                                            payload: {
                                                move: {
                                                    from,
                                                to: squareRepresentation
                                                }
                                            }
                                        }))
                                        setFrom(null);
                                        chess.move({
                                            from,
                                            to: squareRepresentation
                                        });
                                        setBoard(chess.board());
                                    }
                                }}
                                key={j}
                                className={`w-16 h-16 flex justify-center items-center ${(i + j) % 2 === 0 ? 'bg-brown-300' : 'bg-black'}`}>
                                <div className='w-full justify-center flex h-full'>
                                    <div className='h-full justify-center flex flex-col'>
                                        {square ? `${square.color === 'w' ? 'White' : 'Black'} ${square.type.toUpperCase()}` : " "}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default ChessBoard;
