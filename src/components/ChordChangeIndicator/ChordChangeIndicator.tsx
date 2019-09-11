import React from 'react';
import './ChordChangeIndicator.css';
import IChordChangeIndicator from './IChordChangeIndicator';

const ChordChangeIndicator: React.FC<IChordChangeIndicator> = ({skip, circleClass}) => {
    return (
        <div className="circle-container" onClick={() => skip()}>
            <div className={circleClass}/>
        </div>
    )
}

export default ChordChangeIndicator;