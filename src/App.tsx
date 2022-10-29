import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {HeaderBar} from "./HeaderBar";
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {
    addTodoListAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    TodoListReducer
} from "./reducer/todoListReducer";
import {
    addTaskAC,
    changeStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    TaskReducer
} from "./reducer/taskReducer";

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

    function removeTask(id: string, todolistId: string) {
        stateTaskDispatch(removeTaskAC(todolistId, id))
    }

    function addTask(title: string, todolistId: string) {
        stateTaskDispatch(addTaskAC(title, todolistId))
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        stateTaskDispatch(changeStatusAC(id, isDone, todolistId))
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        stateTaskDispatch(changeTaskTitleAC(id, newTitle, todolistId))
    }

    let todolistId1 = v1();
    let todolistId2 = v1();

    const [statetodoList, stateTodoListDispatch] = useReducer(TodoListReducer, [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    const [stateTask, stateTaskDispatch] = useReducer(TaskReducer, {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    })
    console.log({statetodoList, stateTask })

    function addTodolist(title: string) {
        const action = addTodoListAC(title);
        stateTodoListDispatch(action)
        stateTaskDispatch(action)
    }

    function removeTodolist(id: string) {
        stateTodoListDispatch(removeTodolistAC(id))
        stateTaskDispatch(removeTodolistAC(id))
    }

    function changeTodolistTitle(id: string, title: string) {
        stateTodoListDispatch(changeTodolistTitleAC(id, title))
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        stateTodoListDispatch(changeFilterAC(value, todolistId))
    }

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
                            let allTodolistTasks = stateTask[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                            }
                            if (tl.filter === "completed" ) {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                            }

                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
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
