import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {HeaderBar} from "./HeaderBar";
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {
    addTodoListAC, getTodoListTC,
    TodolistDomainType
} from "./reducer/todoListReducer";
import {useAppDispatch, useAppSelector} from "./redux/store";
import {TaskType} from "./api/taskApi";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    console.log('App re-render ...')
    let statetodoList = useAppSelector<TodolistDomainType[]>(state => state.todoList)
    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(getTodoListTC())
    },[])

    const addTodolist = useCallback((title: string) => {
        const action = addTodoListAC(title);
        dispatch(action)
    }, [dispatch])

    return (
        <div className="App">
            <HeaderBar/>
            <Container fixed>
                <Grid container style={{padding: "20px 0 50px 10px"}}>
                    <Grid item style={{minWidth: '310px', maxWidth:'300px'}}>
                        <AddItemForm addItem={addTodolist}/>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    {
                        statetodoList.map(tl => {
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
