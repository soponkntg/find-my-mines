import React, { useState, useEffect } from "react";
import { Button } from "../Button";

export function Music() {
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

  const changeAudioHandler = () => {
    const musicList = ["https://www.chosic.com/wp-content/uploads/2021/07/CHIPTUNE_The_Old_Tower_Inn.mp3",
      'https://www.chosic.com/wp-content/uploads/2020/06/Komiku_-_04_-_Shopping_List.mp3',
      'https://www.chosic.com/wp-content/uploads/2020/08/punch-deck-the-soul-crushing-monotony-of-isolation-instrumental-mix.mp3',
      'https://www.chosic.com/wp-content/uploads/2021/04/Jalandhar.mp3',
      'https://www.chosic.com/wp-content/uploads/2021/07/Japan-by-uniq.mp3',
      'https://www.chosic.com/wp-content/uploads/2020/11/barradeen-bedtime-after-a-coffee.mp3',
      'https://www.chosic.com/wp-content/uploads/2020/09/yoitrax-latte.mp3',
      'https://www.chosic.com/wp-content/uploads/2020/07/punch-deck-brazilian-street-fight.mp3'];
    let x = Math.floor(Math.random() * musicList.length);
    if (audio.src != musicList[x]) {
      audio.pause()
      setPlaying(false)
      console.log('change bg music')
      setAudio(new Audio(musicList[x]))
    } else {
      changeAudioHandler()
    }
  }



  return (
    <>
      <button onClick={playingHandler} style={{ fontSize: "3rem", backgroundColor: 'transparent', border: 'none' }}>
        {playing ? "🔊" : "🔇"}
      </button>
      <Button onClick={changeAudioHandler} style={{ fontSize: "1.5rem", fontFamily: 'evil_empire', borderRadius: '30%' }}>
        Random 🎵
      </Button>
    </>
  );
}
