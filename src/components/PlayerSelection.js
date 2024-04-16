import React, { useState } from 'react';
import ActionButton from './ActionButton';
import { playGame } from './ContractInteraction'; // Import the playGame function from your ContractInteraction.js file

function PlayerSelection() {
  const [player1Move, setPlayer1Move] = useState(''); // State to store player 1's move
  const [player2Move, setPlayer2Move] = useState(''); // State to store player 2's move

  const handlePlayer1Move = (move) => {
    setPlayer1Move(move);
    checkAndPlayGame();
  };

  const handlePlayer2Move = (move) => {
    setPlayer2Move(move);
    checkAndPlayGame();
  };

  const checkAndPlayGame = () => {
    if (player1Move !== '' && player2Move !== '') {
      // Both players have selected moves, trigger the playGame function
      playGame(player1Move, player2Move);
    }
  };

  return (
    <div>
      <h2>Player 1</h2>
      <ActionButton action="rock" onActionSelected={handlePlayer1Move} />
      <ActionButton action="paper" onActionSelected={handlePlayer1Move} />
      <ActionButton action="scissors" onActionSelected={handlePlayer1Move} />

      <h2>Player 2</h2>
      <ActionButton action="rock" onActionSelected={handlePlayer2Move} />
      <ActionButton action="paper" onActionSelected={handlePlayer2Move} />
      <ActionButton action="scissors" onActionSelected={handlePlayer2Move} />
    </div>
  );
}

export default PlayerSelection;
