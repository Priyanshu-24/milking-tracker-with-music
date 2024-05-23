import { useRef, useState } from "react";

import Modal from "./Modal";
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
    console.log(quantity, timer);
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1>Milking Tracker with Music</h1>
      {milking ? (
        <>
          <button onClick={paused ? handleResume : handlePause}>
            {paused ? "Resume" : "Pause"}
          </button>
          <button onClick={stopMilking}>Stop Milking</button>
          <div>{timer} seconds</div>
        </>
      ) : (
        <button onClick={startMilking}>Start Milking</button>
      )}
      <audio ref={audioRef} loop />

      <Modal isOpen={isModalOpen} onSubmit={handleModalSubmit} />
    </div>
  );
};

export default Home;
