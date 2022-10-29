import {TasksStateType} from "../App";
import {v1} from "uuid";
import {addTodoListAC, removeTodolistAC} from "./todoListReducer";


type removeTaskAC = {
    type: 'REMOVE-TASK',
    payload: {
        todolistId: string
        id: string
    }
}

type addTaskAC = {
    type: 'ADD-TASK',
    payload: {
        title: string
        todolistId: string
    }
}

type changeStatusAC = {
    type: 'CHANGE-STATUS',
    payload: {
        id: string
        isDone: boolean
        todolistId: string
    }
}

type changeTaskTitleAC = {
    type: 'CHANGE-TASK-TITLE',
    payload: {
        id: string
        newTitle: string
        todolistId: string
    }
}

type TaskReducerActionType = removeTaskAC | addTaskAC | changeStatusAC | changeTaskTitleAC | addTodoListAC | removeTodolistAC

export const TaskReducer = (state: TasksStateType, action: TaskReducerActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return ({
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.id)
            })
        }
        case "ADD-TASK": {
            let newTask = {id: v1(), title: action.payload.title, isDone: false};
            return ({
                ...state,
                [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]
            })
        }
        case "CHANGE-STATUS": {
            return ({
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.id ? {
                    ...el,
                    isDone: action.payload.isDone
                } : el)
            })
        }
        case "CHANGE-TASK-TITLE": {
            return ({
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.id ? {
                    ...el,
                    title: action.payload.newTitle
                } : el)
            })
        }
        case "ADD-TODOLIST":{
            return({
                ...state,
                [action.payload.todolistId]:[],
            })
        }
        case "REMOVE-TODOLIST":{
            delete state[action.payload.id]
            return ({
                ...state
            })
        }
    }
    return state
}

export const removeTaskAC = (todolistId: string, id: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todolistId,
            id,
        }
    } as const
}

export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            title,
            todolistId,
        }
    } as const
}

export const changeStatusAC = (id: string, isDone: boolean, todolistId: string) => {
    return {
        type: 'CHANGE-STATUS',
        payload: {
            id,
            isDone,
            todolistId,
        }
    } as const
}

export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            id,
            newTitle,
            todolistId,
        }
    } as const
}



