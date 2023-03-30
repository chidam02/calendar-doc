import { sampleEventData } from "../../utils/localstore/data";
import DayView from "./dayView";
import MonthView from "./monthView";
import React, { useEffect } from "react";
import { ICalenderTime, IEvent } from "./types";
import Drawer from "../drawer";
import Modal from "../modal";
import { getLocalStoreItem, setlocalStoreItem } from "../../utils/localstore";
import CalendarForm from "./calendarForm";


export default function Calendar(){
    const [storeData,setstoreData] =React.useState<IEvent[]>(()=>getLocalStoreItem('EVENTDATA')??[]);


    const [selected, setSelected] = React.useState<ICalenderTime|null>(null);

    const [selectedEvent, setSelectedEvent] = React.useState<IEvent|null>(null); 


    const [formType,setFormType] = React.useState<string>("add");
    const [isModalOpen, setModalOpen] = React.useState<boolean>(false)
    const [isDrawerOpen, setDrawerOpen] = React.useState<boolean>(false)

    const monthHandler=(date: Date, events: IEvent[])=>{
        setDrawerOpen(true);
        setSelected({time: date, events: events})
    }

    const dayHandler=(event: IEvent)=>{
        setModalOpen(true);
        setSelectedEvent(event);
        setFormType("edit");
    }


    const addEventHandler=(event)=>{
        
        event.preventDefault();
        const tempEventData = [...storeData];
        const title = event.target.title.value, start = new Date(event.target.start.value), end = new Date(event.target.end.value);
        
        tempEventData.push({ id: tempEventData.length+1, title, start, end })
        setstoreData(tempEventData);
        setSelected(null);
        setDrawerOpen(false);
        setModalOpen(false);
    }

    const editEventHandler=(event,operation="edit")=>{
        
        operation==="edit" && event.preventDefault();
        let tempStoreData = [...storeData];
        if(operation==="delete"){
            tempStoreData = tempStoreData.filter(x=>x.id!==selectedEvent?.id)
        }
        else{
            const title = event.target.title.value, start = new Date(event.target.start.value), end = new Date(event.target.end.value);
            tempStoreData.forEach(ev=>{
                if(ev.id===selectedEvent?.id){
                    ev.end=end;
                    ev.start=start;
                    ev.title=title;
                }
            })
        }
        setFormType("add")
        setModalOpen(false);
        setstoreData(tempStoreData);
        setSelectedEvent(null);
    }
    
    useEffect(()=>{
        setlocalStoreItem('EVENTDATA',storeData);
    },[storeData])
    

    return (<>
    
        <button onClick={()=>{
            setFormType("add");
            setModalOpen(true)
        } } className="block ml-auto border px-4 py-2 mr-2">Add</button>

        <MonthView initialViewDate={new Date()} events={storeData} handler={monthHandler}/>


        {isDrawerOpen && <Drawer isOpen={isDrawerOpen} handleModal={setDrawerOpen}>
            <DayView date={selected?.time??new Date()} events={storeData} eventHandler={dayHandler}/>
        </Drawer>}


        {isModalOpen && <Modal isOpen={isModalOpen} handleModal={setModalOpen}>
                <CalendarForm  submitHandler={formType==="add"?addEventHandler:editEventHandler} type={formType} selectedEvent={formType==="edit"?selectedEvent:null}/>
        </Modal>}



    </>)
}