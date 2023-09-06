import Split from "../models/Split";
import Time, { init as initTime } from "../models/Time";

type State = {
    targetTime: Time;
    targetTimeError: Error | undefined;
    totalDistance: string;
    totalDistanceError: Error | undefined;
    splitDistance: string;
    splitDistanceError: Error | undefined;
    pace: string;
    splits: Split[];
};

export const init: State = {
    targetTime: initTime,
    targetTimeError: undefined,
    totalDistance: "",
    totalDistanceError: undefined,
    splitDistance: "",
    splitDistanceError: undefined,
    pace: "",
    splits: [],
};

export const clearErrors = (state: State): State => {
    return {
        ...state,
        targetTimeError: undefined,
        totalDistanceError: undefined,
        splitDistanceError: undefined,
    };
};

export default State;
