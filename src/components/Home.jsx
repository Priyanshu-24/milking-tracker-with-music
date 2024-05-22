import { useState } from "react";

const Home = () => {
  const [milking, setMilking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timerId, setTimerId] = useState(null);

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

  return (
    <div>
      <h1>Milking Tracker with Music</h1>
      {milking ? (
        <>
          <button onClick={paused ? handleResume : handlePause}>
            {paused ? "Resume" : "Pause"}
          </button>
          <button>Stop Milking</button>
          <div>{timer} seconds</div>
        </>
      ) : (
        <button onClick={startMilking}>Start Milking</button>
      )}
    </div>
  );
};

export default Home;
