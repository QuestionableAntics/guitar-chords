import React, { useState } from 'react';

const DisplayChordCorrectness: React.FC = () => {
    let [correct, setCorrect] = useState(true);

    const player = document.getElementById('player') as HTMLAudioElement;

    navigator.mediaDevices.getUserMedia({audio: true, video: false})
        .then(stream => {
            console.log(stream);
            
            if (player)
                player.srcObject = stream;
            })

    return (
        <React.Fragment>
            <div>{correct ? "correct" : "incorrect"}</div>
            <audio id="player" controls />
        </React.Fragment>
    )
}

export default DisplayChordCorrectness;
