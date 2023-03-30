import { useEffect, useState } from "react";
import { ICalenderDate } from "./types";
// import { sampleEventData } from "../../utils/localstore/data";
import { getEventsForGivenDate } from "./utilityMethods";

const ROW_COUNT = 6;


export default function MonthView(props) {
    const weekDays=['SUN','MON','TUE','WED','THUR','FRI','SAT'];
    const [ currentDates, setCurrentDates] = useState<ICalenderDate[]>([]);

    useEffect(()=>{
        let currentDates:ICalenderDate[] = [];
        let firstDayOfMonth = new Date(props.initialViewDate.getFullYear(), props.initialViewDate.getMonth(), 1);
        let weekdayOfFirstDay = firstDayOfMonth.getDay();//[0-7]

        
        for (let day = 0; day < (ROW_COUNT * 7); day++) {
            if (day === 0 && weekdayOfFirstDay === 0) {
              firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
            } else if (day === 0) {
              firstDayOfMonth.setDate(firstDayOfMonth.getDate() + (day - weekdayOfFirstDay));
            } else {
              firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
            }
        
            let calendarDate: ICalenderDate = {
              date: (new Date(firstDayOfMonth)),
              dayInAMonth: firstDayOfMonth.getDate(),
              events: getEventsForGivenDate(new Date(firstDayOfMonth),props.events)
            };
        
            currentDates.push(calendarDate);
        }

        setCurrentDates(currentDates);

    },[props.initialViewDate, props.events])


    if(!currentDates.length) return null;

    return (
    <section className="p-4 max-w-screen-lg">
    <h1>{new Date(props.initialViewDate).toLocaleString('default',{month:"long",year:"numeric"})}</h1>
    <div className="p-4 grid grid-cols-[repeat(7,minmax(70px,1fr))] grid-rows-[20px_repeat(6,minmax(70px,70px))] gap-4 overflow-auto">
        {
        weekDays.map(day=><div className="border drop-shadow-md" key={day}>{day}</div>)
        }

        {
        currentDates.map((calendarDayDetail,i:number)=>{
            return (
                <div className="relative overflow-hidden border"  key={calendarDayDetail.date.toString()}>
                    
                    {
                        calendarDayDetail.events.map((event)=>(
                            <div
                                className="flex items-center mb-2"
                                key={`${calendarDayDetail.date.toString()}-${event.id}`} 
                            >
                                <span className="inline-block w-1 h-1 rounded-full bg-red-400"></span>
                                <p className="ml-0.5 text-ellipsis">{event.title}</p>
                                <button className="absolute bottom-0 right-0 bg-red-400 drop-shadow-sm rounded p-1 text-sm" onClick={()=>props.handler(calendarDayDetail.date,calendarDayDetail.events)}>view</button>
                            </div>
                        ))
                    }
                    <span className="absolute top-0 right-0 font-extrabold">{calendarDayDetail.dayInAMonth}</span>
                </div>
            )
        })
        }
    </div>
    </section>
    )
}

//extra
/*style={{display:"inline-block",height:`${event.renderOptions.eventLength}%`}}
 * 
 */