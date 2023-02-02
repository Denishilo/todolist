import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Todolist} from "../Todolist";
import React from "react";
import {useAppSelector} from "../../redux/store";
import {TodolistDomainType} from "../../reducer/todolistReducer";

export const TodoListsList = () => {
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

    return (
        <Grid container spacing={3}>
            {listTodolist}
        </Grid>
    )
}