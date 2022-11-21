import React, {ChangeEvent} from 'react';
import {TodolistType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import {useDispatch, useSelector} from "react-redux";
import {addTaskAC, changeStatusAC, changeTaskTitleAC, removeTaskAC} from "./reducer/taskReducer";
import {changeFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./reducer/todoListReducer";
import {RootReducerType} from "./redux/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todoList: TodolistType
}

export function Todolist(props: PropsType) {
    const {id: todolistId, title, filter} = props.todoList

    let stateTask = useSelector<RootReducerType, Array<TaskType>>(state => state.task[todolistId])

    if (filter === "active") {
        stateTask = stateTask.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        stateTask = stateTask.filter(t => t.isDone);
    }
    const dispatch = useDispatch()

    const addTask = (title: string) => {
        dispatch(addTaskAC(title, todolistId))
    }

    const removeTodolist = () => {
        dispatch(removeTodolistAC(todolistId))
    }
    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title))
    }

    const onAllClickHandler = () => dispatch(changeFilterAC("all", todolistId));
    const onActiveClickHandler = () => dispatch(changeFilterAC("active", todolistId));
    const onCompletedClickHandler = () => dispatch(changeFilterAC("completed", todolistId));

    return (
        <div>
            <h3><EditableSpan value={title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist} aria-label="delete">
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    stateTask.map(t => {
                        const onClickHandler = () => dispatch(removeTaskAC(todolistId, t.id))
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked;
                            dispatch(changeStatusAC(t.id, newIsDoneValue, todolistId))
                        }
                        const onTitleChangeHandler = (newValue: string) => {
                            dispatch(changeTaskTitleAC(t.id, newValue, todolistId))
                        }

                        return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                            <Checkbox onChange={onChangeHandler} checked={t.isDone} color='default'/>
                            <EditableSpan value={t.title} onChange={onTitleChangeHandler}/>
                            <IconButton onClick={onClickHandler} aria-label="delete">
                                <DeleteIcon/>
                            </IconButton>
                        </div>
                    })
                }
            </div>
            <div>
                <Button onClick={onAllClickHandler} variant={filter === 'all' ? "contained" : "outlined"}
                        color="primary">
                    All
                </Button>
                <Button onClick={onActiveClickHandler} variant={filter === 'active' ? "contained" : "outlined"}
                        color="success">
                    Active
                </Button>
                <Button onClick={onCompletedClickHandler}
                        variant={filter === 'completed' ? "contained" : "outlined"}
                        color="secondary">
                    Completed
                </Button>
            </div>
        </div>)
}


