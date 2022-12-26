import {RESULT_CODE, TasksStateType} from "../app/App";
import {addTodoListAC, removeTodolistAC, setTodoListsAC} from "./todolistReducer";
import {DataType, taskAPI, TaskStatuses, TaskType, UpdateTaskType} from "../api/taskApi";
import {Dispatch} from "redux";
import {AppActionsType, RootReducerType} from "../redux/store";
import {setError, SetErrorType, setStatus, SetStatusType} from "./appReducer";
import axios, {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../utilits/errorUtilites";
import {TodolistType} from "../api/todolistApi";

const initialState: TasksStateType = {}

export const taskReducer = (state: TasksStateType = initialState, action: TaskReducerActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return ({
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.id)
            })

        case "ADD-TASK":
            return ({
                ...state,
                [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]
            })

        case "CHANGE-STATUS":
            return ({
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.id
                    ? {...el, status: action.payload.status} : el)
            })

        case "CHANGE-TASK-TITLE":
            return ({
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.id
                    ? {...el, title: action.payload.newTitle} : el)
            })

        case "ADD-TODOLIST":
            return ({...state, [action.payload.todolistId]: []})

        case "REMOVE-TODOLIST": {
            delete state[action.payload.id]
            return ({
                ...state
            })
        }

        case "SET-TODOS": {
            let copyState = {...state}
            action.payload.arrayTodoList.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }

        case "SET-TASKS":
            return {...state, [action.payload.todoListId]: action.payload.tasks}

        default:
            return state
    }
}
////////////////////////// ACTION CREATORS ///////////////////////

export const addTaskAC = (todolistId: string,task: TaskType) => {
    return {
        type: 'ADD-TASK',
        payload: {
            task,
            todolistId
        }
    } as const
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

export const changeStatusAC = (todolistId: string, id: string, status: TaskStatuses) => {
    return {
        type: 'CHANGE-STATUS',
        payload: {
            id,
            status,
            todolistId,
        }
    } as const
}

export const changeTaskTitleAC = (todolistId: string, id: string, newTitle: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            id,
            newTitle,
            todolistId,
        }
    } as const
}

export const setTaskAC = (todoListId: string, tasks: TaskType[]) => {
    return {
        type: 'SET-TASKS',
        payload: {
            tasks,
            todoListId
        }
    } as const
}

////////////////////////// THUNK CREATORS ///////////////////////

export const getTasksTC = (todoListId: string) => async (dispatch: Dispatch<AppActionsType>) => {
    dispatch(setStatus('loading'))
    try {
        let res = await taskAPI.getTask(todoListId)
        if (res.data.items.length>=0) {
            dispatch(setTaskAC(todoListId, res.data.items))
            dispatch(setStatus('succeeded'))
        } else {
            dispatch(setError('Some error occurred'))
            dispatch(setStatus('failed'))
        }
    } catch (e) {
        if (axios.isAxiosError<AxiosError<{ message: string }>>(e)) {
            const error = e.response ? e.response.data.message : e.message
            handleServerNetworkError(error, dispatch)
        }
    }
}

export const createTaskTC = (todoListId: string, title: string) => async (dispatch: Dispatch<AppActionsType>) => {
    dispatch(setStatus('loading'))
    try {
        let res = await taskAPI.createTask(todoListId, title)
        if (res.data.resultCode === RESULT_CODE.SUCCESS) {
            dispatch(addTaskAC(todoListId,res.data.data.item))
            dispatch(setStatus('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        if (axios.isAxiosError<AxiosError<{ message: string }>>(e)) {
            const error = e.response ? e.response.data.message : e.message
            handleServerNetworkError(error, dispatch)
        }
    }
}

export const removeTaskTC = (todoListId: string, taskId: string) => async (dispatch: Dispatch<AppActionsType>) => {
    dispatch(setStatus('loading'))
    try {
        let res = await taskAPI.deleteTask(todoListId, taskId)
        if (res.data.resultCode === RESULT_CODE.SUCCESS) {
            dispatch(removeTaskAC(todoListId, taskId))
            dispatch(setStatus('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        if (axios.isAxiosError<AxiosError<{ message: string }>>(e)) {
            const error = e.response ? e.response.data.message : e.message
            handleServerNetworkError(error, dispatch)
        }
    }
}

export const updateTaskStatusTC = (todoListId: string, taskId: string, status: TaskStatuses) => (dispatch: Dispatch<AppActionsType>, getState: () => RootReducerType) => {
    const taskObj = getState().task[todoListId].find((ts) => ts.id === taskId)
    if (taskObj) {
        const changeTaskOdj: UpdateTaskType = {
            title: taskObj.title,
            description: taskObj.description,
            completed: taskObj.completed,
            status: status,
            priority: taskObj.priority,
            startDate: taskObj.startDate,
            deadline: taskObj.deadline,
        }
        dispatch(setStatus('loading'))
        taskAPI.updateTask(todoListId, taskId, changeTaskOdj)
            .then(res => {
                const {status} = res.data.data.item
                dispatch(changeStatusAC(todoListId, taskId, status))
                dispatch(setStatus('succeeded'))
            })
            .catch((e) => {
                if (axios.isAxiosError<AxiosError<{ message: string }>>(e)) {
                    const error = e.response ? e.response.data.message : e.message
                    handleServerNetworkError(error, dispatch)
                }
            })
    }
}

export const updateTaskTitleTC = (todoListId: string, taskId: string, title: string) => (dispatch: Dispatch<AppActionsType>, getState: () => RootReducerType) => {
    const taskObj = getState().task[todoListId].find(t => t.id === taskId)
    if (taskObj) {
        const changeTaskOdj: UpdateTaskType = {
            title: title,
            description: taskObj.description,
            completed: taskObj.completed,
            status: taskObj.status,
            priority: taskObj.priority,
            startDate: taskObj.startDate,
            deadline: taskObj.deadline,
        }
        dispatch(setStatus('loading'))
        taskAPI.updateTask(todoListId, taskId, changeTaskOdj)
            .then(res => {
                if (res.data.resultCode === RESULT_CODE.SUCCESS) {
                    dispatch(changeTaskTitleAC(todoListId, taskId, title))
                    dispatch(setStatus('succeeded'))
                } else {
                    handleServerAppError<{ item: TaskType }>(res.data, dispatch)
                }
            })
            .catch((e: AxiosError<{ message: string }>) => {
                const error = e.response ? e.response.data.message : e.message
                handleServerNetworkError(error, dispatch)
            })
    }
}

////////////// types

export type TaskReducerActionType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodoListsAC>
    | ReturnType<typeof setTaskAC>
    | SetStatusType
    | SetErrorType