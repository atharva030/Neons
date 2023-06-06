import TaskContext from "./taskContext";
import { useState } from "react";
const TaskState = (props) => {
    const sake={
        "name":"Athava"
    };
    return (
        //passing values or exporting the functions of notes,setNotes as a object
        <TaskContext.Provider value={sake}>
            {props.children}
        </TaskContext.Provider>
    );

}

export default TaskState;