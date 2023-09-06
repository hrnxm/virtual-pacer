import React, { useContext } from "react";
import "./SplitsTable.css";
import { MainCtx } from "../store/MainCtx";
import {
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Tfoot,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";

const SplitsTable: React.FC = () => {
    const { state } = useContext(MainCtx);

    return (
        <TableContainer className="splits">
            <Table variant="simple">
                <TableCaption>Split Schedule</TableCaption>
                <Thead>
                    <Tr>
                        <Th className="colored" color={"teal.400"} isNumeric>
                            #
                        </Th>
                        <Th isNumeric>
                            Distance <span className="lowercase">(m)</span>
                        </Th>
                        <Th isNumeric>Time</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {state.splits.map(({ iteration, time, distance }) => {
                        return (
                            <Tr key={String(iteration)}>
                                <Td isNumeric>{iteration}</Td>
                                <Td isNumeric>{distance}</Td>
                                <Td isNumeric>{time}</Td>
                            </Tr>
                        );
                    })}
                </Tbody>

                {state.splits.length > 0 && (
                    <Tfoot>
                        <Tr>
                            <Th className="colored" color={"teal.400"} isNumeric>
                                #
                            </Th>
                            <Th isNumeric>
                                Distance <span className="lowercase">(m)</span>
                            </Th>
                            <Th isNumeric>Time</Th>
                        </Tr>
                    </Tfoot>
                )}
            </Table>
        </TableContainer>
    );
};

export default SplitsTable;
