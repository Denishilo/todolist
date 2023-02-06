import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Todolist} from "../Todolist";
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {getTodoListTC, TodolistDomainType} from "../../reducer/todolistReducer";
import {Navigate, useNavigate} from "react-router-dom";

export const TodoListsList = () => {
    const dispatch = useAppDispatch()

    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const navigate = useNavigate()
    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getTodoListTC())
        }
    }, [])
    let stateTodoList = useAppSelector<TodolistDomainType[]>(state => state.todoList)

    const listTodolist = stateTodoList.map(tl => {
        return <Grid item>
            <Paper style={{padding: '10px'}}>
                <Todolist
                    key={tl.id}
                    todoList={tl}
                />
            </Paper>
        </Grid>
    })

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
        // navigate()
    }
    return (
        <Grid container spacing={3}>
            {listTodolist}
        </Grid>
    )
}