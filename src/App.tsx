import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {HeaderBar} from "./HeaderBar";
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {addTodoListAC} from "./reducer/todoListReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "./redux/store";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    console.log('App re-render ...')
    let statetodoList = useSelector<RootReducerType, TodolistType[]>(state => state.todoList)
    const dispatch = useDispatch()

    const addTodolist = useCallback((title: string) => {
        const action = addTodoListAC(title);
        dispatch(action)
    }, [dispatch])

    return (
        <div className="App">
            <HeaderBar/>
            <Container fixed>
                <Grid container style={{padding: "20px 0 50px 0"}}>
                    <Grid item style={{minWidth: '282px'}}>
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
