import React from "react";

export default function CalendarForm(props) {
  const { title = "", start = "", end = "" } = props.selectedEvent || {};
  const [formValues, setFormValues] = React.useState(()=>{
    if(!props.selectedEvent) return {title : "", start : "", end : ""}
    let sDate = new Date(start).toLocaleString().split(",");
    let eDate = new Date(end).toLocaleString().split(",");
    return {
        title: title,
        start: `${sDate[0].trim().split("/").reverse().join("-")}T${sDate[1].trim().slice(0,9)}`,
        end: `${eDate[0].trim().split("/").reverse().join("-")}T${eDate[1].trim().slice(0,9)}`,
    };
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <form className="block grow p-4" onSubmit={props.submitHandler}>
        <h1 className="text-center">{props.type==="edit"?"EDIT DATA":"ADD DATA"}</h1>
      <div className="mb-4">
        <label className="block text-slate-700 mb-2 text-sm">Title</label>
        <input
          className="block w-full rounded border"
          name="title"
          type="text"
          required
          onChange={changeHandler}
          value={formValues.title}
        />
      </div>

      <div className="mb-4">
        <label className="block text-slate-700 mb-2 text-sm">Starts At</label>
        <input
          className="block w-full rounded border"
          name="start"
          type="datetime-local"
          required
          onChange={changeHandler}
          value={formValues.start}
        />
      </div>
      <div className="mb-4">
        <label className="block text-slate-700 mb-2 text-sm">Ends At</label>
        <input
          className="block w-full rounded border"
          name="end"
          type="datetime-local"
          required
          onChange={changeHandler}
          value={formValues.end}
        />
      </div>
      <div className="flex">
      <button
        type="submit"
        className="border-black px-4 py-1 bg-blue-500 rounded m-auto block"
      >
        submit
      </button>
      {props.type==="edit" && props.selectedEvent && <button
        type="button"
        onClick={()=>props.submitHandler(props.selectedEvent,"delete")}
        className="border-black px-4 py-1 bg-blue-500 rounded m-auto block"
      >
        Del
      </button>}
      </div>
      
    </form>
  );
}
