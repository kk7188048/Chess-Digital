import { Color, Square, PieceSymbol } from "chess.js";

export default function ChessSquare({
    square,
}: {
    square: { Square: Square, type: PieceSymbol, color: Color }
}) {
    return (
        <div className="h-full justify-center flex flex-col ">
        {square ?
        <img
            className="w-4"
            src={`/${square?.color === "b" ? square?.type : `${square?.type?.toUpperCase()} copy`}.png`}
        /> : null}
        </div>
    );
}