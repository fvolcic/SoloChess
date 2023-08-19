import { useState, useEffect } from "react";
import { Chessboard } from "react-chessboard";

const { Chess } = require('chess.js')

const stockfish = new Worker("stockfish.js");
stockfish.addEventListener("message", (event) => {
    console.log(event.data);
});

export function SoloChess() {
    const [game, setGame] = useState(new Chess());
    const [boardOrientation, setBoardOrientation] = useState("white"); // or "black"

    // useEffect(() => {
    //     stockfish.postMessage("uci");
    //     stockfish.postMessage("debug on");
    //     stockfish.postMessage("ucinewgame");
    // }, []);

    // useEffect(() => {
    //     console.log(game.fen()); 
    //     stockfish.postMessage("stop");
    //     stockfish.postMessage(`position fen ${game.fen()}`);
    //     stockfish.postMessage("go depth 7");

        

    // }, [game]);


    function makeAMove(move) {
        console.log(game);
        const gameCopy = new Chess(game.fen());
        const result = gameCopy.move(move);
        setGame(gameCopy);
        return result; // null if the move was illegal, the move object if the move was legal
    }

    function onDrop(sourceSquare, targetSquare) {
        const move = makeAMove({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q", // always promote to a queen for example simplicity
        });

        // illegal move
        if (move === null) return false;
        setBoardOrientation(boardOrientation === "white" ? "black" : "white");
        
        return true;
    }

    return <Chessboard  boardWidth={
        window.innerWidth > 1000 ? 1000 : window.innerWidth - 20
    } boardOrientation={boardOrientation} position={game.fen()} onPieceDrop={onDrop} />;
}