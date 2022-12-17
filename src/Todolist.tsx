import React, {memo, useCallback, useEffect} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import {addTaskAC, getTasksTC} from "./reducer/taskReducer";
import {changeFilterAC, changeTodolistTitleAC, removeTodolistAC, TodolistDomainType} from "./reducer/todoListReducer";
import {useAppDispatch, useAppSelector} from "./redux/store";
import {Task} from "./Task";
import {TaskType} from "./api/taskApi";


type PropsType = {
    todoList: TodolistDomainType
}

export const Todolist = memo((props: PropsType) => {
    console.log('TodoList re-render ...')
    const {id: todolistId, title, filter} = props.todoList

    let stateTask = useAppSelector<Array<TaskType>>(state => state.task[todolistId])
    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(getTasksTC(todolistId))
    },[])

    if (filter === "active") {
        stateTask = stateTask.filter(t => t.status === 0);
    }
    if (filter === "completed") {
        stateTask = stateTask.filter(t => t.status === 2);
    }

    console.log(stateTask)

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, todolistId))
    }, [dispatch, todolistId, addTaskAC])

    const removeTodolist = () => {
        dispatch(removeTodolistAC(todolistId))
    }
    const changeTodolistTitle = useCallback((title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title))
    }, [dispatch, todolistId, changeTodolistTitleAC])

    const onAllClickHandler = useCallback(() => dispatch(changeFilterAC("all", todolistId)), [changeFilterAC, dispatch, todolistId]);
    const onActiveClickHandler = useCallback(() => dispatch(changeFilterAC("active", todolistId)), [changeFilterAC, dispatch, todolistId]);
    const onCompletedClickHandler = useCallback(() => dispatch(changeFilterAC("completed", todolistId)), [changeFilterAC, dispatch, todolistId]);

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
                        return <Task key={t.id} task={t} todolistId={todolistId}/>
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


