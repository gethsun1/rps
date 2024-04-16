import React, { useState, useEffect } from 'react';
import { Button, InputGroup, Form } from 'react-bootstrap'; // Assuming you're using Bootstrap components
import Web3 from 'web3';
import { abi, address } from './YourSmartContract.json';
import Player from './components/Player'; // Assuming you have a Player component
import ActionButton from './components/ActionButton'; // Assuming you have an ActionButton component

export default function App() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [gameAddress, setGameAddress] = useState('');
  const [opponentAddress, setOpponentAddress] = useState('');
  const [playerSelection, setPlayerSelection] = useState({ player1: '', player2: '' });
  const [gameStatus, setGameStatus] = useState({ winner: '', player1Move: '', player2Move: '' });
  const [betAmount, setBetAmount] = useState(''); // State for bet amount input

  const connectWalletHandler = async () => {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
      const gameInstance = new web3Instance.eth.Contract(abi, address);
      setContract(gameInstance);
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }
  };

  const handleChangeonBet = (event) => {
    setBetAmount(event.target.value);
  };

  const play = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      const txHash = await contract.methods.playGame(gameAddress).send({
        from: accounts[0],
        value: web3.utils.toWei(betAmount, 'ether'),
      });
      console.log('Transaction Hash:', txHash.transactionHash);
      setGameAddress(txHash.transactionHash);
    } catch (error) {
      console.error('Error playing game:', error);
    }
  };

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const gameInstance = new web3Instance.eth.Contract(abi, address);
          setContract(gameInstance);
        } catch (error) {
          console.error('Error connecting to MetaMask:', error);
        }
      } else {
        console.error('MetaMask not found');
      }
    };
    initWeb3();
  }, []);

  return (
    <div className="center">
      <h1>Rock Paper Scissors</h1>
      <Button className="button-connect" variant="outline-primary" onClick={connectWalletHandler}>
        Connect Wallet
      </Button>
      <div className="container">
        <Player name="Player 1" action={playerSelection.player1} />
        <Player name="Player 2" action={playerSelection.player2} />
      </div>
      <div>
        <ActionButton action="rock" onActionSelected={setPlayerSelection} />
        <ActionButton action="paper" onActionSelected={setPlayerSelection} />
        <ActionButton action="scissors" onActionSelected={setPlayerSelection} />
      </div>
      <div className="inputs">
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">Bet Amount</InputGroup.Text>
          <Form.Control
            aria-label="Bet Amount"
            aria-describedby="inputGroup-sizing-default"
            onChange={handleChangeonBet}
            value={betAmount}
          />
        </InputGroup>
      </div>
      <Button variant="success" className="button-play" onClick={play}>
        Play!
      </Button>
      <p>{`Latest transaction hash: ${gameAddress}`}</p>
    </div>
  );
}
