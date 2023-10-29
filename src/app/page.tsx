/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image'
import { cardsName } from './constants';

const TOTAL_CARDS = 24;

const Home: React.FC = () => {
  const [drawnCards, setDrawnCards] = useState<number[]>([]);
  const [currentCard, setCurrentCard] = useState<number>(25);
  const [gameStatus, setGameStatus] = useState<"idle" | "running" | "paused" | "stopped">("idle");
  let intervalId: NodeJS.Timeout;

    
  const drawCard = () => {
    if (drawnCards.length >= TOTAL_CARDS) return;

    let newCard: number;
    do {
      newCard = Math.floor(Math.random() * TOTAL_CARDS);
    } while (drawnCards.includes(newCard));

    setDrawnCards([...drawnCards, newCard]);
    setCurrentCard(newCard);
    
    // Note: This is a mock, for real audio you'd use some libraries or APIs.
    const speech = new SpeechSynthesisUtterance(`${cardsName[newCard]}`);
    window?.speechSynthesis?.speak?.(speech);
  };

  const getImage = (name: string) => {
    if(!name) return '/images/trickortreat.svg'
    return `/images/${name?.replace(' ', '')?.toLowerCase()}.png`
  }

  useEffect(() => {
    if (gameStatus === "running") {
      intervalId = setInterval(drawCard, 15000);
    } 
    return () => clearInterval(intervalId);
  }, [gameStatus, drawnCards]);

  const startGame = () => {
    setGameStatus("running");
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    }
  };

  const stopGame = () => {
    clearInterval(intervalId);
    setDrawnCards([]);
    setCurrentCard(25);
    setGameStatus("stopped");
    if (document.exitFullscreen) {
      document.exitFullscreen(); 
    }
  };

  const pauseGame = () => {
    clearInterval(intervalId);
    setGameStatus("paused");
  };

  const restartGame = () => {
    clearInterval(intervalId);
    setDrawnCards([]);
    setCurrentCard(25);
    setGameStatus("running");
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 w-full mx-auto bg-cover bg-center bg-[url('/krrssna-web-background-halloween.svg')] h-[100vh]">
      <h1 className="text-6xl shadow-lg mb-5 text-[#fff]">Welcome to Halloween Bingo</h1>
      <div className="mt-5 text-2xl flex items-center flex-col bg-slate-100 rounded-lg shadow-xl">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src={getImage(cardsName[currentCard])}
          alt={cardsName[currentCard]}
          width={400}
          height={400}
          priority
        />
      </div>
      {drawnCards.length > 0 &&<div className="mt-5">
            <ul className="border p-3 rounded grid grid-cols-12 gap-4 bg-slate-100">
                {drawnCards.map((card, index) => (
                  <li key={index} className="h-[80px] border rounded-lg shadow-lg flex items-center justify-center ">
                      <Image
                        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                        src={getImage(cardsName[card])}
                        alt={cardsName[card]}
                        width={80}
                        height={80}
                        priority
                      />
                    </li>
                ))}
            </ul>
        </div>
}
      <div className="mt-5">
        <button onClick={startGame} className="m-2 p-2 bg-green-500 text-white rounded">Start</button>
        <button onClick={pauseGame} className="m-2 p-2 bg-yellow-500 text-white rounded">Pause</button>
        <button onClick={stopGame} className="m-2 p-2 bg-red-500 text-white rounded">Stop</button>
        <button onClick={restartGame} className="m-2 p-2 bg-blue-500 text-white rounded">Restart</button>
      </div>

    </div>
  );
}

export default Home;