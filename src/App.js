import logo from './logo.svg';
import './App.css';
import { SoloChess } from './game';
import { Chessboard } from "react-chessboard";
import { Chess } from 'chess.js';
import { useState } from 'react';
function App() {

  const [game, setGame] = useState(new Chess());
  const [turn, setTurn] = useState('white');

  function onPieceDrop(color, sourceSquare, targetSquare) {
    const gameCopy = new Chess(game.fen());

    if (color !== turn) return false;

    try {
      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q", // always promote to a queen for example simplicity
      }, { strict: true });

      if (move === null) return false;

      setGame(gameCopy);
      setTurn(turn === 'white' ? 'black' : 'white');

    } catch (e) {
      return false;
    }


  }

  return (
    <div className='App'>
      <div className='app-main'>
        <div className='app-split-view'>
          <div className='pane-1' 
          style={{backgroundColor: turn === 'white' ? 'blue' : 'white'}}
          >
            <Chessboard position={game.fen()} onPieceDrop={
              (source, target) => onPieceDrop("white", source, target)
            } />
          </div>
          <div className='pane-2'
          style={{backgroundColor: turn === 'black' ? 'blue' : 'white'}}
          >
            <Chessboard position={game.fen()} boardOrientation='black' 
              onPieceDrop={
                (source, target) => onPieceDrop("black", source, target)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
