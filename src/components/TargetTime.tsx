import React, { useContext } from "react";
import "./TargetTime.css";
import { MainCtx } from "../store/MainCtx";
import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    NumberInput,
    NumberInputField,
    Text,
} from "@chakra-ui/react";
import { ActionType } from "../models/Action";

const TargetTime: React.FC = () => {
    const { state, update } = useContext(MainCtx);

    return (
        <div className="target-time">
            <FormControl isInvalid={!!state.targetTimeError}>
                <FormLabel>Target time</FormLabel>
                <NumberInput
                    id="hours"
                    focusBorderColor="teal.500"
                    size={"md"}
                    min={0}
                    max={100}
                    keepWithinRange={true}
                    onChange={(val) =>
                        update({
                            type: ActionType.TargetTimeInput,
                            unit: "hours",
                            value: val,
                        })
                    }
                    format={(value) => (+value > 100 ? "100" : String(+value).padStart(2, "0"))}
                    defaultValue={state.targetTime.hours}>
                    <NumberInputField onFocus={(e) => e.target.select()} width={39} />
                </NumberInput>
                <Text fontSize={"4xl"}>:</Text>
                <NumberInput
                    id="minutes"
                    focusBorderColor="teal.500"
                    size={"md"}
                    min={0}
                    max={59}
                    keepWithinRange={true}
                    onChange={(val) =>
                        update({
                            type: ActionType.TargetTimeInput,
                            unit: "minutes",
                            value: val,
                        })
                    }
                    format={(value) => (+value > 59 ? "59" : String(+value).padStart(2, "0"))}
                    defaultValue={state.targetTime.minutes}>
                    <NumberInputField onFocus={(e) => e.target.select()} width={39} />
                </NumberInput>
                <Text fontSize={"4xl"}>:</Text>
                <NumberInput
                    id="seconds"
                    focusBorderColor="teal.500"
                    size={"md"}
                    min={0}
                    max={59}
                    keepWithinRange={true}
                    onChange={(val) =>
                        update({
                            type: ActionType.TargetTimeInput,
                            unit: "seconds",
                            value: val,
                        })
                    }
                    format={(value) => (+value > 59 ? "59" : String(+value).padStart(2, "0"))}
                    defaultValue={state.targetTime.seconds}>
                    <NumberInputField onFocus={(e) => e.target.select()} width={39} />
                </NumberInput>
                {state.targetTimeError && (
                    <FormErrorMessage>{state.targetTimeError.message}</FormErrorMessage>
                )}
            </FormControl>
        </div>
    );
};

export default TargetTime;
