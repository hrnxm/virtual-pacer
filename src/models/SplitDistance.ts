const SplitDistance = {
    "100 m": "100",
    "200 m": "200",
    "250 m": "250",
    "400 m": "400",
    "500 m": "500",
    "1 km": "1000",
} as const;

export type Caption = keyof typeof SplitDistance;
export type Value = (typeof SplitDistance)[Caption];

export default SplitDistance;
