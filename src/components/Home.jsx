import { useRef, useState } from "react";

import { Link } from "react-router-dom";
import Modal from "./Modal";
import dayjs from "dayjs";
import musicFile from "./../assets/track.mp3";

const Home = () => {
  const [milking, setMilking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timerId, setTimerId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const audioRef = useRef(null);

  const startTimer = () => {
    const id = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
    setTimerId(id);
  };

  const startMilking = () => {
    setMilking(true);
    audioRef.current.src = musicFile;
    audioRef.current.play();
    startTimer();
  };

  const handleResume = () => {
    setPaused(false);
    audioRef.current.play();
    startTimer();
  };

  const handlePause = () => {
    setPaused(true);
    clearInterval(timerId);
    audioRef.current.pause();
  };

  const stopMilking = () => {
    setMilking(false);
    setPaused(false);
    clearInterval(timerId);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsModalOpen(true);
  };

  const handleModalSubmit = (quantity) => {
    const dateFormatter = dayjs();

    setTimer(0);
    setIsModalOpen(false);
    const session = {
      date: dateFormatter.format("DD-MM-YY"),
      startTime: dateFormatter.subtract(timer, "second").format("HH:MM:SS"),
      endTime: dateFormatter.format("HH:MM:SS"),
      totalTime: timer,
      quantity,
    };
    const history = JSON.parse(localStorage.getItem("milkingHistory")) || [];
    history.push(session);
    localStorage.setItem("milkingHistory", JSON.stringify(history));
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full flex justify-between items-center mb-6 p-4 bg-blue-200">
        <h1 className="text-3xl font-bold">Milking Tracker</h1>
        <Link
          to="/history"
          className="text-green-700 hover:underline font-semibold"
        >
          History
        </Link>
      </div>
      {milking ? (
        <>
          <div className="flex flex-col items-center gap-5">
            <button
              onClick={paused ? handleResume : handlePause}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {paused ? "Resume" : "Pause"}
            </button>
            <button
              onClick={stopMilking}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Stop Milking
            </button>
            <div className="text-xl">{timer} seconds</div>
          </div>
        </>
      ) : (
        <button
          onClick={startMilking}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Start Milking
        </button>
      )}
      <audio ref={audioRef} loop />

      <Modal isOpen={isModalOpen} onSubmit={handleModalSubmit} />
    </div>
  );
};

export default Home;
