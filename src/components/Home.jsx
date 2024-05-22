import Modal from "./Modal";
import { useState } from "react";

const Home = () => {
  const [milking, setMilking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timerId, setTimerId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const startTimer = () => {
    const id = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
    setTimerId(id);
  };

  const startMilking = () => {
    setMilking(true);
    startTimer();
  };

  const handleResume = () => {
    setPaused(false);
    startTimer();
  };

  const handlePause = () => {
    setPaused(true);
    clearInterval(timerId);
  };

  const stopMilking = () => {
    setMilking(false);
    setPaused(false);
    clearInterval(timerId);
    setIsModalOpen(true);
  };

  const handleModalSubmit = (quantity) => {
    console.log(quantity);
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
      <Modal isOpen={isModalOpen} onSubmit={handleModalSubmit} />
    </div>
  );
};

export default Home;
