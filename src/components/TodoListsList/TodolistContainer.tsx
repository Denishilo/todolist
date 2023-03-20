import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist";
import React, {useEffect} from "react";
import {useAppDispatch} from "../../redux/store";
import {getTodoListTC} from "../../reducer/TodolistReducer";
import {Navigate} from "react-router-dom";
import {PATH} from "../../common/Constants/Path";
import {useSelector} from "react-redux";
import {isLoggedInSelector, todoListSelector} from "./TodoListSelectors";

export const TodolistContainer = () => {
    const dispatch = useAppDispatch()

    const isLoggedIn = useSelector(isLoggedInSelector)
    const stateTodoList = useSelector(todoListSelector)

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getTodoListTC())
        }
    }, [])

    const listTodolist = stateTodoList.map(tl => {
        return <Grid item key={tl.id}>
            <Paper style={{padding: '10px'}}>
                <Todolist
                    key={tl.id}
                    todoList={tl}
                />
            </Paper>
        </Grid>
    })

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <Grid container spacing={3}>
            {listTodolist}
        </Grid>
    )
}