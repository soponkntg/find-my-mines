import React, { useState, useEffect } from "react";
import style from "./Music.module.css";

function Music() {
  let [audio, setAudio] = useState("");
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setAudio(
      new Audio(
        "https://www.chosic.com/wp-content/uploads/2021/07/CHIPTUNE_The_Old_Tower_Inn.mp3"
      )
    );
  }, []);

  const playingHandler = () => {
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play();
      setPlaying(true);
    }
  };

  return (
    <div>
      <button className={style["music-button"]} onClick={playingHandler}>
        {playing ? "🔊 Music On" : "🔇 Music Off"}
      </button>
    </div>
  );
}

export default Music;
