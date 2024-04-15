# Rock-Paper-Scissors Smart Contract

## Overview

This is a simple Solidity smart contract that implements the Rock-Paper-Scissors game on the Ethereum blockchain. Players can create games, play moves, and resolve outcomes through this contract.

## Smart Contract Details

### Variables

- `enum Move`: Defines the possible moves in the game (Rock, Paper, Scissors).
- `enum GameResult`: Represents the possible game results (Player1Wins, Player2Wins, Draw).
- `struct Game`: Stores information about each game, including players, moves, result, and game status.
- `mapping(address => uint256) public balances`: Tracks player balances for winnings.
- `mapping(bytes32 => Game) public games`: Stores ongoing games mapped by a unique identifier.

### Functions

- `createGame(address player2) external payable`: Allows a player to create a new game with a specified opponent.
- `playGame(bytes32 gameId, Move move) external`: Lets players submit their moves in an ongoing game.
- `resolveGame(bytes32 gameId) internal`: Determines the game outcome and distributes winnings accordingly.
- `withdraw() external`: Enables players to withdraw their winnings from the contract.

## How to Use

1. Deploy the smart contract on an Ethereum network.
2. Interact with the contract using a compatible Ethereum wallet or development environment.
3. Players can create games, play moves, and withdraw their winnings through the provided functions.

## Development Environment

- Solidity version: ^0.8.0
- Compiler: solc (Solidity compiler)
- Ethereum network: Rinkeby testnet (for testing and development)
- Development tools: Remix IDE, Truffle Suite, Ganache

## Deployment

- Deploy the contract using Remix IDE, Truffle, or any compatible deployment tool.
- Use the deployed contract address to interact with it from Ethereum wallets or DApps.

## Testing

- Use Remix IDE or Truffle Suite for testing contract functionality.
- Write unit tests to cover various scenarios like creating games, playing moves, and resolving outcomes.

## Contributors

- [Your Name](https://github.com/gethsun1) - Developer
- [Contributor 1](https://github.com/evansmburu) - Testing and Feedback
- [Contributor 2](https://github.com/raynor) - Code Review and Suggestions

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
