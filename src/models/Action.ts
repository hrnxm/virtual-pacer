import { Value as SplitDistanceValue } from "./SplitDistance";
import { TimeUnit } from "./Time";

export enum ActionType {
    TargetTimeInput = "TargetTimeInput",
    TotalDistanceInput = "TotalDistanceInput",
    SplitDistanceSelected = "SplitDistanceSelected",
    Calculate = "Calculate",
}

type Action =
    | { type: ActionType.TargetTimeInput; unit: TimeUnit; value: string }
    | { type: ActionType.TotalDistanceInput; value: string }
    | { type: ActionType.SplitDistanceSelected; value: SplitDistanceValue }
    | { type: ActionType.Calculate };

export default Action;
