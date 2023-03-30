import React, { useEffect } from "react";
import { ICalenderTime } from "./types";
import { getEventsForGivenTime } from "./utilityMethods";

export default function DayView(props){

    const [currentTimes,setCurrentTimes] = React.useState<ICalenderTime[]>([]);

    useEffect(()=>{
        let currentTimes:ICalenderTime[] = [];
        let firstTimeOfDay = new Date(props.date.getFullYear(), props.date.getMonth(), props.date.getDate());

        
        for (let time = 0; time < 24; time++) {
            let calendarDayTime: ICalenderTime = {
              time: (new Date(firstTimeOfDay)),
              timeString: firstTimeOfDay.toLocaleTimeString(),
              events: getEventsForGivenTime(new Date(firstTimeOfDay),props.events)
            };
        
            currentTimes.push(calendarDayTime);
            firstTimeOfDay.setHours(firstTimeOfDay.getHours()+1)
        }

        setCurrentTimes(currentTimes);
    },[props.date,props.events])


    return (<>
        <div className="p-4">
            {
                currentTimes.map(timeInDay=>{
                    return (
                    <div className="mb-8" key={timeInDay.time.toString()}>
                        <p className="text-xs border-b border-slate-500">{timeInDay.timeString}</p>
                        {
                            timeInDay.events.map((event)=>(
                                <div
                                    className="flex items-center mb-2 ml-4 cursor-pointer"
                                    key={`${timeInDay.time.toString()}-${event.id}`} 
                                    onClick={()=>props.eventHandler(event)}
                                >
                                    <span className="inline-block w-1 h-1 rounded-full bg-red-400"></span>
                                    <p className="ml-0.5 text-ellipsis">{event.title}</p>

                                </div>
                            ))
                        }
                    </div>)
                })
            }
        </div>
    </>)
}