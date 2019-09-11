import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import chords from './chords.json';
import Chord from './chord';
import Helmet from 'react-helmet';
import ChordChangeIndicator from './components/ChordChangeIndicator/ChordChangeIndicator';
import IChordChangeTiming from './interfaces/IChordChangeTiming';
import ChangeTimingInput from './components/ChordChangeTimingInput/ChangeTimingInput';
import DisplayChordCorrectness from './components/DisplayChordCorrectness/DisplayChordCorrectness';

const chordSet: Chord[] = chords.beginnerChords;

const App: React.FC = () => {
  let [chordChangeTiming, setChordChangeTiming] = useState<IChordChangeTiming>({lastValidTiming: 5, currentTiming: 5});
  let images = [];
  
  let [currentChord, setCurrentChord] = useState<Chord>(chordSet[Math.floor(Math.random()*chordSet.length)])
  let [circleClass, setCircleClass] = useState<string>("circle");
  let [intervalList, setIntervalList] = useState<number[]>([]);

  useRef(() => {
    images = chordSet.map(chord => {
      const image = new Image();
      image.src = chord.chordPictureUrl;
      return image;
    });
  });

  useEffect(() => {
    return nextChord();
  }, []);

  const nextChord = (newTiming: number = 0) => {
    const timingToUse = newTiming ? newTiming : chordChangeTiming.lastValidTiming;

    setCurrentChord(chordSet[Math.floor(Math.random()*chordSet.length)]);
    const setNewChord = window.setInterval(() => {
      setCurrentChord(chordSet[Math.floor(Math.random()*chordSet.length)]);
    }, timingToUse * 1000);

    const keepCircleInSync = window.setInterval(() => {
        setCircleClass("circle");
    });

    setIntervalList([setNewChord, keepCircleInSync]);

    return () => {
      clearInterval(setNewChord);
      clearInterval(keepCircleInSync);
    }
  }

  const skip = (newTiming: number = 0) => {
    setCircleClass("");
    intervalList.forEach((interval: number) => {
      clearInterval(interval);
    });
    nextChord(newTiming);
  }

  const changeTiming = (newTiming: number) => {
    if (newTiming) {
      setChordChangeTiming({lastValidTiming: newTiming, currentTiming: newTiming});
      skip(newTiming);
    }
    else {
      setChordChangeTiming({lastValidTiming: chordChangeTiming.lastValidTiming, currentTiming: newTiming})
    }
  }


  return (
    <div className="App">
      <Helmet>
        <style>{`
          :root {
            --transitionTime: ${chordChangeTiming.lastValidTiming}s;
          }          
        `}</style>
      </Helmet>
      <ChangeTimingInput chordChangeTiming={chordChangeTiming} changeTiming={changeTiming}/>
      <header className="App-header">
        <div className="chord">{currentChord.chordName}</div>
        <img className="chord-picture" src={currentChord.chordPictureUrl}></img>
        <ChordChangeIndicator circleClass={circleClass} skip={skip}/>
        {/* <DisplayChordCorrectness /> */}
      </header>
    </div>
  );
}

export default App;
