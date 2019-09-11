import IChordChangeTiming from '../../interfaces/IChordChangeTiming';

export default interface IChordChangeTimingInput {
    chordChangeTiming: IChordChangeTiming;
    changeTiming(newTiming: number | void): void;
}