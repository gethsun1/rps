// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title Rock Paper Scissors Game
/// @notice A simple smart contract for playing Rock-Paper-Scissors game between two players
contract RockPaperScissors {
    enum Move { None, Rock, Paper, Scissors } // Possible moves in the game
    enum GameResult { None, Player1Wins, Player2Wins, Draw } // Possible game results

    struct Game {
        address player1;
        address player2;
        Move move1;
        Move move2;
        GameResult result;
        bool isFinished;
    }

    mapping(address => uint256) public balances; // Mapping to store player balances
    mapping(bytes32 => Game) public games; // Mapping to store ongoing games

    event GameCreated(address indexed player1, address indexed player2, bytes32 gameId);
    event GamePlayed(address indexed player1, address indexed player2, bytes32 gameId, Move move1, Move move2, GameResult result);

    /// @notice Creates a new Rock-Paper-Scissors game between the caller and a specified opponent
    /// @param player2 The address of the opponent player
    function createGame(address player2) external payable {
        require(msg.value > 0, "Must send ether to play");
        require(player2 != address(0) && player2 != msg.sender, "Invalid player");

        bytes32 gameId = keccak256(abi.encodePacked(msg.sender, player2, block.timestamp));
        games[gameId] = Game(msg.sender, player2, Move.None, Move.None, GameResult.None, false);
        emit GameCreated(msg.sender, player2, gameId);
    }

    /// @notice Plays a move in an ongoing Rock-Paper-Scissors game
    /// @param gameId The unique identifier of the game
    /// @param move The move to be played (Rock, Paper, or Scissors)
    function playGame(bytes32 gameId, Move move) external {
        Game storage game = games[gameId];
        require(!game.isFinished, "Game is already finished");
        require(game.player1 == msg.sender || game.player2 == msg.sender, "Not a player in this game");

        if (msg.sender == game.player1) {
            game.move1 = move;
        } else {
            game.move2 = move;
        }

        if (game.move1 != Move.None && game.move2 != Move.None) {
            resolveGame(gameId);
        }
    }

    /// @notice Resolves the outcome of a Rock-Paper-Scissors game and distributes winnings
    /// @param gameId The unique identifier of the game
    function resolveGame(bytes32 gameId) internal {
        Game storage game = games[gameId];
        game.isFinished = true;

        if (game.move1 == game.move2) {
            game.result = GameResult.Draw;
        } else if ((game.move1 == Move.Rock && game.move2 == Move.Scissors) ||
                   (game.move1 == Move.Paper && game.move2 == Move.Rock) ||
                   (game.move1 == Move.Scissors && game.move2 == Move.Paper)) {
            game.result = GameResult.Player1Wins;
            balances[game.player1] += 2 * address(this).balance;
        } else {
            game.result = GameResult.Player2Wins;
            balances[game.player2] += 2 * address(this).balance;
        }

        emit GamePlayed(game.player1, game.player2, gameId, game.move1, game.move2, game.result);
    }

    /// @notice Allows players to withdraw their winnings from the contract
    function withdraw() external {
        uint256 amount = balances[msg.sender];
        require(amount > 0, "No balance to withdraw");
        balances[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }
}
