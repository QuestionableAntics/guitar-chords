import React from 'react';
import IChordChangeTimingInput from './IChordChangeTimingInput';

const ChangeTimingInput: React.FC<IChordChangeTimingInput> = ({chordChangeTiming, changeTiming}) => {
    const timingInputValue = chordChangeTiming.currentTiming ? chordChangeTiming.currentTiming : '';
    
    return (
      <input type="text" 
             value={timingInputValue} 
             pattern="^[0-9]*\.?[0-9]*$" // TODO: figure out why this won't allow decimals
             onChange={event => changeTiming(parseFloat(event.target.value))}
             placeholder={`Currently ${chordChangeTiming.lastValidTiming}`}></input>
    )
}

export default ChangeTimingInput;