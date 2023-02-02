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
import {Navigate, Route, Routes} from "react-router-dom";
import {TodoListsList} from "../components/TodoListsList/todoListsList";
import {Login} from "../components/Login/login";

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
                <Grid container style={{padding: "20px 0 50px 0px"}}>
                    <Grid item style={{minWidth: '310px', maxWidth: '300px'}}>
                        <AddItemForm addItem={addTodolist}/>
                    </Grid>
                </Grid>
                <Container>
                    <Routes>
                        <Route path={'/'} element={<TodoListsList/>}/>
                        <Route path={'/login'} element={<Login/>}/>
                        <Route path={'/404'} element={<h1>404: PAGE NOT FOUND</h1>}/>
                        <Route path={'*'} element={<Navigate to={'/404'}/>}/>
                    </Routes>
                </Container>
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