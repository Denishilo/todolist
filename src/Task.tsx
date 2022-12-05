import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {ChangeEvent, memo} from "react";
import {changeStatusAC, changeTaskTitleAC, removeTaskAC} from "./reducer/taskReducer";
import {useDispatch} from "react-redux";

type TaskTypeProps = {
    isDone: boolean
    title: string
    id: string
    todolistId: string
}

export const Task = memo((props: TaskTypeProps) => {
    let {isDone, title, id, todolistId} = props
    const dispatch = useDispatch()

    const onClickHandler = () => dispatch(removeTaskAC(todolistId, id))

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeStatusAC(id, newIsDoneValue, todolistId))
    }

    const onTitleChangeHandler = (newValue: string) => {
        dispatch(changeTaskTitleAC(id, newValue, todolistId))
    }

    return (
        <div className={isDone ? "is-done" : ""}>
            <Checkbox onChange={onChangeHandler} checked={isDone} color='default'/>
            <EditableSpan value={title} onChange={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler} aria-label="delete">
                <DeleteIcon/>
            </IconButton>
        </div>)
})