import {RESULT_CODE, TasksStateType} from "../app/App";
import {addTodoListAC, removeTodolistAC, setTodoListsAC, TodolistActions} from "./TodolistReducer";
import {taskAPI, TaskStatuses, TaskType, UpdateTaskType} from "../api/taskAPI";
import {Dispatch} from "redux";
import {AppActionsType, RootReducerType, ThunkAppDispatchType} from "../redux/store";
import {setError, SetErrorType, setStatus, SetStatusType} from "./AppReducer";
import axios, {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../utilits/errorUtilites";

const initialState: TasksStateType = {}

export const taskReducer = (state: TasksStateType = initialState, action: TaskReducerActionType): TasksStateType => {
    switch (action.type) {
        case TaskActions.REMOVE_TASK:
            return ({
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.id)
            })

        case TaskActions.ADD_TASK:
            return ({
                ...state,
                [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]
            })

        case TaskActions.CHANGE_STATUS:
            return ({
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.id
                    ? {...el, status: action.payload.status} : el)
            })

        case TaskActions.CHANGE_TASK_TITLE:
            return ({
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.id
                    ? {...el, title: action.payload.newTitle} : el)
            })

        case TodolistActions.REMOVE_TODOLIST: {
            delete state[action.payload.id]
            return ({
                ...state
            })
        }

        case TodolistActions.SET_TODOS: {
            let copyState = {...state}
            action.payload.arrayTodoList.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }

        case TaskActions.SET_TASKS:
            return {...state, [action.payload.todoListId]: action.payload.tasks}

        default:
            return state
    }
}
////////////////////////// ACTION CREATORS ///////////////////////

export const addTaskAC = (todolistId: string, task: TaskType) => {
    return {
        type: TaskActions.ADD_TASK,
        payload: {
            task,
            todolistId
        }
    } as const
}

export const removeTaskAC = (todolistId: string, id: string) => {
    return {
        type: TaskActions.REMOVE_TASK,
        payload: {
            todolistId,
            id,
        }
    } as const
}

export const changeStatusAC = (todolistId: string, id: string, status: TaskStatuses) => {
    return {
        type: TaskActions.CHANGE_STATUS,
        payload: {
            id,
            status,
            todolistId,
        }
    } as const
}

export const changeTaskTitleAC = (todolistId: string, id: string, newTitle: string) => {
    return {
        type: TaskActions.CHANGE_TASK_TITLE,
        payload: {
            id,
            newTitle,
            todolistId,
        }
    } as const
}

export const setTaskAC = (todoListId: string, tasks: TaskType[]) => {
    return {
        type: TaskActions.SET_TASKS,
        payload: {
            tasks,
            todoListId
        }
    } as const
}

////////////////////////// THUNK CREATORS ///////////////////////

export const getTasksTC = (todoListId: string) => async (dispatch: ThunkAppDispatchType) => {
    dispatch(setStatus('loading'))
    try {
        let res = await taskAPI.getTask(todoListId)
        if (res.data.items.length >= 0) {
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

export const createTaskTC = (todoListId: string, title: string) => async (dispatch: ThunkAppDispatchType) => {
    dispatch(setStatus('loading'))
    try {
        let res = await taskAPI.createTask(todoListId, title)
        if (res.data.resultCode === RESULT_CODE.SUCCESS) {
            dispatch(addTaskAC(todoListId, res.data.data.item))
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

export const removeTaskTC = (todoListId: string, taskId: string) => async (dispatch: ThunkAppDispatchType) => {
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

export const updateTaskStatusTC = (todoListId: string, taskId: string, status: TaskStatuses) => async (dispatch: ThunkAppDispatchType, getState: () => RootReducerType) => {
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
        try {
            let res = await taskAPI.updateTask(todoListId, taskId, changeTaskOdj)
            const {status} = res.data.data.item
            dispatch(changeStatusAC(todoListId, taskId, status))
            dispatch(setStatus('succeeded'))
        } catch (e) {
            if (axios.isAxiosError<AxiosError<{ message: string }>>(e)) {
                const error = e.response ? e.response.data.message : e.message
                handleServerNetworkError(error, dispatch)
            }
        }
    }
}

export const updateTaskTitleTC = (todoListId: string, taskId: string, title: string) => async (dispatch: ThunkAppDispatchType, getState: () => RootReducerType) => {
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
        try {
            let res = await taskAPI.updateTask(todoListId, taskId, changeTaskOdj)
            if (res.data.resultCode === RESULT_CODE.SUCCESS) {
                dispatch(changeTaskTitleAC(todoListId, taskId, title))
                dispatch(setStatus('succeeded'))
            } else {
                handleServerAppError<{ item: TaskType }>(res.data, dispatch)
            }
        } catch (e) {
            if (axios.isAxiosError<AxiosError<{ message: string }>>(e)) {
                const error = e.response ? e.response.data.message : e.message
                handleServerNetworkError(error, dispatch)
            }
        }
    }
}

///////////////////// types //////////////
export const TaskActions = {
    REMOVE_TASK: 'REMOVE-TASK',
    ADD_TASK: 'ADD_TASK',
    CHANGE_STATUS: 'CHANGE_STATUS',
    CHANGE_TASK_TITLE: 'CHANGE_TASK_TITLE',
    SET_TASKS: 'SET_TASKS',
} as const

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