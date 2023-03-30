import { IEvent } from "../../components/calendar/types";

export const sampleEventData: IEvent[] = [{
    id: 1,
    title: 'event 1',
    start: new Date('2023-03-25 12:00:01+05:30'),
    end: new Date('2023-03-25 13:00:00+05:30'),
},
{
    id: 2,
    title: 'event 2',
    start: new Date('2023-03-25 14:00:01'),
    end: new Date('2023-03-25 14:59:00'),
},
{
    id: 3,
    title: 'event 3',
    start: new Date('2023-03-25 19:00:01'),
    end: new Date('2023-03-25 20:00:00'),
},
{
    id: 4,
    title: 'event 4',
    start: new Date('2023-03-25 20:00:01'),
    end: new Date('2023-03-25 21:00:00'),
},
{
    id: 5,
    title: 'event 5',
    start: new Date('2023-03-25 21:00:01'),
    end: new Date('2023-03-25 22:00:00'),
},
{
    id: 6,
    title: 'event 6',
    start: new Date('2023-03-25 22:00:01'),
    end: new Date('2023-03-25 23:00:00'),
}
]