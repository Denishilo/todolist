import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from '../components/Todolist';
import {AddItemForm} from '../components/AddItemForm/AddItemForm';
import {HeaderBar} from "../components/HeaderBar";
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {addTodoListTC, getTodoListTC, TodolistDomainType} from "../reducer/todolistReducer";
import {useAppDispatch, useAppSelector} from "../redux/store";
import {TaskType} from "../api/taskApi";

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Menu} from '@mui/icons-material';
import LinearProgress from '@mui/material/LinearProgress';
import {RequestStatusType} from "../reducer/appReducer";
import {ErrorSnackbar} from "../components/ErrorSnackBar/ErrorSnackbar";
import {v1} from "uuid";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    let status = useAppSelector<RequestStatusType>(state => state.app.status)
    let stateTodoList = useAppSelector<TodolistDomainType[]>(state => state.todoList)
    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(getTodoListTC())
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodoListTC(title))
    }, [dispatch])

    return (
        <div className="App">
            <ErrorSnackbar/>
            <HeaderBar/>
            {status === 'loading' && <LinearProgress color="secondary"/>}
            <Container fixed>
                <Grid container style={{padding: "20px 0 50px 10px"}}>
                    <Grid item style={{minWidth: '310px', maxWidth: '300px'}}>
                        <AddItemForm addItem={addTodolist}/>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    {
                        stateTodoList.map(tl => {
                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        todoList={tl}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;


///types

export enum RESULT_CODE {
    SUCCESS = 0,
    ERROR = 1,
    CAPTCHA = 10,
}