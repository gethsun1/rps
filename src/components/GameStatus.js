import React, { useState, useEffect } from 'react';
import { subscribeToGamePlayedEvent } from './ContractInteraction'; // Import the event subscription function from your ContractInteraction.js file

function GameStatus() {
  const [gameInfo, setGameInfo] = useState({
    winner: '',
    player1Move: '',
    player2Move: '',
  });

  useEffect(() => {
    // Subscribe to the GamePlayed event
    const unsubscribe = subscribeToGamePlayedEvent((event) => {
      const { player1, player2, move1, move2, result } = event.returnValues;
      setGameInfo({
        winner: result === 'Player1Wins' ? player1 : result === 'Player2Wins' ? player2 : 'Draw',
        player1Move: move1,
        player2Move: move2,
      });
    });

    return () => {
      unsubscribe(); // Cleanup the subscription on component unmount
    };
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div>
      <h2>Game Status</h2>
      {gameInfo.winner ? (
        <div>
          <p>Winner: {gameInfo.winner}</p>
          <p>Player 1 Move: {gameInfo.player1Move}</p>
          <p>Player 2 Move: {gameInfo.player2Move}</p>
        </div>
      ) : (
        <p>Game in progress...</p>
      )}
    </div>
  );
}

export default GameStatus;
