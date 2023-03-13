import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../../common/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {ChangeEvent, FC, memo} from "react";
import {removeTaskTC, updateTaskStatusTC, updateTaskTitleTC,} from "../../reducer/taskReducer";
import {TaskType} from "../../api/taskAPI";
import {useAppDispatch, useAppSelector} from "../../redux/store";

export const Task: FC<PropsType> = memo(({task, todolistId}) => {
    console.log('tasks')
    const {status, title, id} = task

    const dispatch = useAppDispatch()
    const entityStatus = useAppSelector(state => state.app.status)
    const onClickHandler = () => dispatch(removeTaskTC(todolistId, id))

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let statusValue = e.currentTarget.checked ? 2 : 0;
        dispatch(updateTaskStatusTC(todolistId, id, statusValue))
    }

    const onTitleChangeHandler = (newValue: string) => {
        dispatch(updateTaskTitleTC(todolistId, id, newValue))
    }

    return (
        <div className={status === 2 ? "is-done" : ""}>
            <Checkbox disabled={entityStatus === 'loading'} onChange={onChangeHandler} checked={status === 2}
                      color='default'/>
            <EditableSpan value={title} onChange={onTitleChangeHandler}/>
            <IconButton disabled={entityStatus === 'loading'} onClick={onClickHandler} aria-label="delete">
                <DeleteIcon/>
            </IconButton>
        </div>)
})

/////////////////// types /////////////////

type PropsType = {
    task: TaskType
    todolistId: string
}