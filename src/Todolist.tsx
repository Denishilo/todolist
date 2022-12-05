import React, { memo, useCallback} from 'react';
import {TodolistType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import {useDispatch, useSelector} from "react-redux";
import {addTaskAC} from "./reducer/taskReducer";
import {changeFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./reducer/todoListReducer";
import {RootReducerType} from "./redux/store";
import {Task} from "./Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todoList: TodolistType
}

export const Todolist = memo((props: PropsType) => {
    console.log('TodoList re-render ...')
    const {id: todolistId, title, filter} = props.todoList

    let stateTask = useSelector<RootReducerType, Array<TaskType>>(state => state.task[todolistId])
    const dispatch = useDispatch()

    if (filter === "active") {
        stateTask = stateTask.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        stateTask = stateTask.filter(t => t.isDone);
    }

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, todolistId))
    }, [dispatch, todolistId, addTaskAC])

    const removeTodolist = () => {
        dispatch(removeTodolistAC(todolistId))
    }
    const changeTodolistTitle = useCallback((title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title))
    }, [dispatch, todolistId, changeTodolistTitleAC])

    const onAllClickHandler = useCallback(() => dispatch(changeFilterAC("all", todolistId)),[changeFilterAC,dispatch,todolistId]);
    const onActiveClickHandler = useCallback(() => dispatch(changeFilterAC("active", todolistId)),[changeFilterAC,dispatch,todolistId]);
    const onCompletedClickHandler = useCallback(() => dispatch(changeFilterAC("completed", todolistId)),[changeFilterAC,dispatch,todolistId]);

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
                        return <Task key={t.id} isDone={t.isDone} title={t.title} id={t.id} todolistId={todolistId}/>
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
})


