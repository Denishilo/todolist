import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {ChangeEvent, memo} from "react";
import {removeTaskTC, updateTaskStatusTC, updateTaskTitleTC,} from "../reducer/taskReducer";
import {TaskType} from "../api/taskApi";
import {useAppDispatch} from "../redux/store";

type TaskTypeProps = {
    task:TaskType
    todolistId: string
}

export const Task = memo((props: TaskTypeProps) => {
    let {todolistId} = props
    let {status, title, id} = props.task

    const dispatch = useAppDispatch()
    const onClickHandler = () => dispatch(removeTaskTC(todolistId, id))

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let statusValue = e.currentTarget.checked? 2 : 0;
        dispatch(updateTaskStatusTC(todolistId,id, statusValue))
    }

    const onTitleChangeHandler = (newValue: string) => {
        dispatch(updateTaskTitleTC(todolistId, id, newValue))
    }

    return (
        <div className={status === 2 ? "is-done" : ""}>
            <Checkbox onChange={onChangeHandler} checked={status === 2} color='default'/>
            <EditableSpan value={title} onChange={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler} aria-label="delete">
                <DeleteIcon/>
            </IconButton>
        </div>)
})