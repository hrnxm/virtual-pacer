import React, { useContext } from "react";
import "./Distances.css";
import { MainCtx } from "../store/MainCtx";
import {
    FormControl,
    FormErrorMessage,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Select,
} from "@chakra-ui/react";
import { ActionType } from "../models/Action";
import SplitDistance, { Value as SplitDistanceValue } from "../models/SplitDistance";

const Distances: React.FC = () => {
    const { state, update } = useContext(MainCtx);

    return (
        <FormControl
            className="total-and-split"
            isInvalid={!!state.totalDistanceError || !!state.splitDistanceError}>
            <NumberInput
                id="total"
                focusBorderColor="teal.500"
                isInvalid={!!state.totalDistanceError}
                width={200}
                defaultValue={state.totalDistance}
                onChange={(val) => update({ type: ActionType.TotalDistanceInput, value: val })}
                min={0}
                max={100000}
                keepWithinRange>
                <NumberInputField placeholder="Total Distance (m)" />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
            {state.totalDistanceError ? (
                <FormErrorMessage>{state.totalDistanceError.message}</FormErrorMessage>
            ) : state.splitDistanceError ? (
                <FormErrorMessage>{state.splitDistanceError.message}</FormErrorMessage>
            ) : null}
            <Select
                id="split"
                focusBorderColor="teal.500"
                onChange={(e) =>
                    update({
                        type: ActionType.SplitDistanceSelected,
                        value: e.target.value as SplitDistanceValue,
                    })
                }
                width={200}
                placeholder="Split Distance"
                defaultValue={state.splitDistance}
                isInvalid={!!state.splitDistanceError}>
                {Object.entries(SplitDistance).map(([key, value]) => (
                    <option key={value} value={value}>
                        {key}
                    </option>
                ))}
            </Select>
        </FormControl>
    );
};

export default Distances;
