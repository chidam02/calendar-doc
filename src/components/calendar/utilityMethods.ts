import { IEvent } from "./types";

export function getEventsForGivenDate(date: Date, allAvailableEvents: IEvent[]) {
    
  const filteredEvents = allAvailableEvents.filter(
    (event) => {
        const start = typeof event.start === "object"?event.start:new Date(event.start);
        const end = typeof event.end === "object"?event.end:new Date(event.end);
        
        return start.getTime() >= date.getTime() && date.getTime()+86400000 >= end.getTime()
    }
  );

  return filteredEvents
    .sort((a, b) => a.start.getTime() - b.start.getTime())
    .slice();
}

export function getEventsForGivenTime(date: Date, allEventsForTheDay: IEvent[]) {
    
    const filteredEvents = allEventsForTheDay.filter(
      (event) => {
        console.log()
          return event.start.getTime() >= date.getTime() && date.getTime()+3600000 >= event.end.getTime()
      }
    );
  
    return filteredEvents
      .sort((a, b) => a.start.getTime() - b.start.getTime())
      .slice();
  }

//extra..
/*
if((dateString===eventStartDateStr || dateString===eventEndDateStr) || (event.start<= date && date<=event.end)){
            
    const totalEventLengthInPercent = ((event.end.getTime() - event.start.getTime())/86400000) * 100;

    let seqNo = 1;
    let eventLength;

    if(totalEventLengthInPercent>100){
        if(eventStartDateStr===dateString) {
            seqNo = 1;
            eventLength = 100;
        }
        
        else if (eventEndDateStr===dateString) {
            seqNo = totalEventLengthInPercent%100===0?totalEventLengthInPercent/100:Math.floor(totalEventLengthInPercent/100)+1;
            eventLength = totalEventLengthInPercent%100===0?100:totalEventLengthInPercent%100;
        }
        else{
        const startCpy = new Date(event.start);
        let no=1;

        while(startCpy<date && startCpy.getDate()!==date.getDate()){
            startCpy.setDate(startCpy.getDate()+1)
            no++;
        }
        seqNo=no;

        const remaininglength = totalEventLengthInPercent-((seqNo-1)*100);
        if(remaininglength>100) eventLength=100;
        else eventLength=remaininglength%100;
        }
    }
    else{
    
        seqNo=0;
        eventLength = totalEventLengthInPercent;
    }

    filteredEvents.push({...event,renderOptions: {seqNo , eventLength }})
}
*/
