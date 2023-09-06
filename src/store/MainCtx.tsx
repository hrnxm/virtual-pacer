import React, { useReducer } from "react";
import Action, { ActionType } from "../models/Action";
import State, { clearErrors, init as initState } from "./State";
import * as Time from "../models/Time";

type MainCtxType = {
    state: State;
    update: React.Dispatch<Action>;
};

export const MainCtx = React.createContext<MainCtxType>({
    state: initState,
    update: () => {
        console.error("MainCtx not initialized!");
    },
});

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case ActionType.TargetTimeInput:
            return {
                ...state,
                targetTime: { ...state.targetTime, [action.unit]: action.value },
                targetTimeError: undefined,
            };
        case ActionType.TotalDistanceInput:
            return { ...state, totalDistance: action.value, totalDistanceError: undefined };
        case ActionType.SplitDistanceSelected:
            return { ...state, splitDistance: action.value, splitDistanceError: undefined };
        case ActionType.Calculate:
            const newState = clearErrors(state);
            const hours = +state.targetTime.hours,
                minutes = +state.targetTime.minutes,
                seconds = +state.targetTime.seconds;
            if (hours === 0 && minutes === 0 && seconds == 0)
                return { ...newState, targetTimeError: new Error("Time cannot be zero") };
            const totalSeconds = seconds + minutes * 60 + hours * 3600;
            const totalDistanceNum = +state.totalDistance;
            if (isNaN(totalDistanceNum) || totalDistanceNum <= 0)
                return { ...newState, totalDistanceError: new Error("Invalid distance") };
            const splitDistanceNum = +state.splitDistance;
            if (splitDistanceNum === 0)
                return { ...newState, splitDistanceError: new Error("Missing field") };
            if (totalDistanceNum % splitDistanceNum !== 0)
                return {
                    ...newState,
                    splitDistanceError: new Error(
                        `${state.totalDistance} is not divisible by ${state.splitDistance}`
                    ),
                };
            const numberOfSplits = totalDistanceNum / splitDistanceNum;
            const splitTime = totalSeconds / numberOfSplits;
            const pace = Time.format(Time.fromSeconds((totalSeconds / totalDistanceNum) * 1000));
            const splits = Array(numberOfSplits)
                .fill(null)
                .map((_, i) => {
                    const currentSplit = i + 1;
                    const currentSplitTime = currentSplit * splitTime;
                    const formattedCurrentSplitTime = Time.format(
                        Time.fromSeconds(currentSplitTime)
                    );
                    const currentDistance = Math.round(currentSplit * +state.splitDistance);
                    return {
                        iteration: currentSplit,
                        time: formattedCurrentSplitTime,
                        distance: currentDistance,
                    };
                });

            return { ...state, pace: pace, splits: splits };

        default:
            console.error("Unhandled action:", action);
            return state;
    }
};

const MainCtxProvider: React.FC<{ children: React.ReactNode }> = (props) => {
    const [state, dispatch] = useReducer(reducer, initState);

    const contextValue: MainCtxType = {
        state: state,
        update: dispatch,
    };

    return <MainCtx.Provider value={contextValue}>{props.children}</MainCtx.Provider>;
};

export default MainCtxProvider;
