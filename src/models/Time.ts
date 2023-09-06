type Time = {
    hours: string;
    minutes: string;
    seconds: string;
};

export type TimeUnit = keyof Time;

export const init: Time = {
    hours: "00",
    minutes: "00",
    seconds: "00",
};

const pad = (unit: string) => unit.padStart(2, "0");

export const fromSeconds = (seconds: number): Time => {
    let hh, mm, ss;
    mm = Math.floor(seconds / 60);
    if (mm >= 60) {
        hh = Math.floor(mm / 60);
        mm = Math.round(mm % 60);
    }
    ss = Math.round(seconds % 60);
    return {
        hours: hh ? pad(String(hh)) : "00",
        minutes: mm ? pad(String(mm)) : "00",
        seconds: ss ? pad(String(ss)) : "00",
    };
};

export const format = (time: Time): string => {
    const minutes = pad(time.minutes);
    const seconds = pad(time.seconds);
    if (+time.hours === 0) {
        return `${minutes}:${seconds}`;
    } else {
        return `${pad(time.hours)}:${minutes}:${seconds}`;
    }
};

export default Time;
