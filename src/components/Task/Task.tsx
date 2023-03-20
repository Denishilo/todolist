import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../../common/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {ChangeEvent, FC, memo, useCallback} from "react";
import {removeTaskTC, updateTaskStatusTC, updateTaskTitleTC,} from "../../reducer/TaskReducer";
import {TaskType} from "../../api/taskAPI";
import {useAppDispatch} from "../../redux/store";
import {useSelector} from "react-redux";
import {statusSelector} from "../../app/appSelectors";

export const Task: FC<PropsType> = memo(({task, todolistId}) => {
    const {status, title, id} = task

    const dispatch = useAppDispatch()
    const entityStatus = useSelector(statusSelector)
    const onClickHandler = useCallback(() => dispatch(removeTaskTC(todolistId, id)), [todolistId, id,removeTaskTC])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let statusValue = e.currentTarget.checked ? 2 : 0;
        dispatch(updateTaskStatusTC(todolistId, id, statusValue))
    }, [todolistId, id,updateTaskStatusTC])

    const onTitleChangeHandler = useCallback((newValue: string) => {
        dispatch(updateTaskTitleTC(todolistId, id, newValue))
    }, [todolistId, id,updateTaskTitleTC])

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