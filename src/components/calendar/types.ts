export interface IEvent {
    id: number|string;
    title: string;
    desc?: string;
    start: Date;
    end: Date;
}

export interface ICalenderDate {
    date: Date;
    dayInAMonth: number,
    events: IEvent[];
}

export interface ICalenderTime {
    time: Date;
    timeString?: string,
    events: IEvent[];
}