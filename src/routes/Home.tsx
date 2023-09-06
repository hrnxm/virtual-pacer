import React, { useContext } from "react";
import { Button, Stat, StatLabel, StatNumber, StatHelpText } from "@chakra-ui/react";
import "./Home.css";
import TargetTime from "../components/TargetTime";
import Distances from "../components/Distances";
import { ActionType } from "../models/Action";
import { MainCtx } from "../store/MainCtx";
import SplitsTable from "../components/SplitsTable";

const Home: React.FC = () => {
    const { state, update } = useContext(MainCtx);

    return (
        <>
            <div className="inputs">
                <TargetTime />
                <Distances />
                <Button colorScheme="teal" onClick={() => update({ type: ActionType.Calculate })}>
                    Calculate
                </Button>
            </div>

            {state.pace && (
                <Stat>
                    <StatLabel>Pace</StatLabel>
                    <StatNumber>{state.pace}</StatNumber>
                    <StatHelpText className="colored" color={"teal.400"}>
                        / km
                    </StatHelpText>
                </Stat>
            )}

            <SplitsTable />
        </>
    );
};

export default Home;
