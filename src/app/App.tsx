import React, {useCallback, useEffect} from 'react';
import {HeaderBar} from "../common/Header/HeaderBar";
import Container from '@mui/material/Container';
import {addTodoListTC} from "../reducer/TodolistReducer";
import {useAppDispatch} from "../redux/store";
import {TaskType} from "../api/taskAPI";
import LinearProgress from '@mui/material/LinearProgress';
import {ErrorSnackbar} from "../common/ErrorSnackBar/ErrorSnackbar";
import {meAuthTC} from "../reducer/AuthReducer";
import {useSelector} from "react-redux";
import {isInitializedSelector, statusSelector} from "./appSelectors";
import {LoaderWrapper} from "../common/LoaderWrapper/LoaderWrapper";
import {Pages} from "../components/Pages/Pages";

import {AddItemForm} from "../common/AddItemForm/AddItemForm";

function App() {
    const dispatch = useAppDispatch()

    const status = useSelector(statusSelector)
    const isInitialized = useSelector(isInitializedSelector)

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodoListTC(title))
    }, [dispatch])

    useEffect(() => {
        dispatch(meAuthTC())
    }, [])

    if (!isInitialized) {
        return <LoaderWrapper/>
    }

    return (
        <div className="App">
            <HeaderBar/>
            {status === 'loading' && <LinearProgress color="secondary"/>}
            <Container fixed>
                <AddItemForm addItem={addTodolist}/>
                <Pages/>
            </Container>
            <ErrorSnackbar/>
        </div>
    );
}

export default App;

///////////////// types //////////////////

export enum RESULT_CODE {
    SUCCESS = 0,
    ERROR = 1,
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}