import {v1} from "uuid";
import {todoListAPI, TodolistType} from "../api/todolistApi";
import {Dispatch} from "redux";
import {AppActionsType} from "../redux/store";
import {RequestStatusType, setError, setStatus, SetStatusType} from "./appReducer";
import {AxiosError} from "axios";
import {RESULT_CODE} from "../app/App";
import {handleServerAppError, handleServerNetworkError} from "../utilits/errorUtilites";
import axios from "axios";

const initialState: TodolistDomainType[] = []

export const todolistReducer = (state: TodolistDomainType[] = initialState, action: TodoListReducerActionType): TodolistDomainType[] => {
    switch (action.type) {
        case "ADD-TODOLIST": {
            let newTodolist: TodolistDomainType = {
                id: action.payload.todolistId, title: action.payload.title, filter: 'all', addedDate: '',
                order: 0, entityStatus: 'idle'
            }
            return [newTodolist, ...state]
        }

        case "CHANGE-TODOLIST-TITTLE":
            return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)

        case "REMOVE-TODOLIST":
            return state.filter(el => el.id !== action.payload.id)

        case "CHANGE-FILTER":
            return state.map(el => el.id === action.payload.todolistId ? {...el, filter: action.payload.value} : el)

        case "SET-TODOS":
            return action.payload.arrayTodoList.map((tl) => ({...tl, filter: "all", entityStatus: 'idle'}))
        case "SET-ENTITY-STATUS":
            return state.map(tl => tl.id === action.payload.todolistId ? {
                ...tl,
                entityStatus: action.payload.entityStatus
            } : tl)
        default:
            return state
    }
}

////////////////////////// ACTION CREATORS ///////////////////////

export const addTodoListAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title,
            todolistId: v1()
        }
    } as const
}

export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITTLE',
        payload: {
            title,
            id
        }
    } as const
}

export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id
        }
    } as const
}

export const changeFilterAC = (value: FilterValuesType, todolistId: string) => {
    return {
        type: 'CHANGE-FILTER',
        payload: {
            value,
            todolistId,
        }
    } as const
}

export const setTodoListsAC = (arrayTodoList: TodolistType[]) => {
    return {
        type: 'SET-TODOS',
        payload: {
            arrayTodoList
        }
    } as const
}

export const setEntityStatusAC = (todolistId: string, entityStatus: RequestStatusType) => {
    return {
        type: 'SET-ENTITY-STATUS',
        payload: {
            todolistId,
            entityStatus,
        }
    } as const
}

////////////////////////// THUNK CREATORS ///////////////////////

export const getTodoListTC = () => (dispatch: Dispatch<TodoListReducerActionType>) => {
    dispatch(setStatus('loading'))
    todoListAPI.getTodoList()
        .then(res => {
            console.log('getTodo',res)
            dispatch(setTodoListsAC(res.data))
            dispatch(setStatus('succeeded'))
        })
        .catch(e => {
            handleServerNetworkError(e.message, dispatch)
        })
}

export const addTodoListTC = (title: string) => (dispatch: Dispatch<AppActionsType>) => {
    dispatch(setStatus('loading'))
    todoListAPI.createTodoList(title)
        .then(res => {
            if (res.data.resultCode === RESULT_CODE.SUCCESS) {
                dispatch(addTodoListAC(title))
                dispatch(setStatus('succeeded'))
            } else {
                handleServerAppError<{ item: TodolistType }>(res.data, dispatch)
            }
        })
        .catch((e) => {
            handleServerNetworkError(e.message, dispatch)
        })
}

export const deleteTodoListTC = (todolistId: string) => (dispatch: Dispatch<AppActionsType>) => {
    dispatch(setStatus('loading'))
    dispatch(setEntityStatusAC(todolistId, 'loading'))
    todoListAPI.deleteTodoList(todolistId)
        .then(res => {
            if(res.data.resultCode === RESULT_CODE.SUCCESS){
                dispatch(removeTodolistAC(todolistId))
                dispatch(setStatus('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((e: Error) => {
            dispatch(setEntityStatusAC(todolistId, 'idle'))
            dispatch(setStatus('failed'))
            dispatch(setError(e.message))
        })
}

export const changeTitleTodolistTC = (todolistId: string, title: string) => async (dispatch: Dispatch<AppActionsType>) => {
    dispatch(setStatus('loading'))
    try{
        let res = await todoListAPI.updateTodoList(todolistId, title)
        if(res.data.resultCode === RESULT_CODE.SUCCESS){
            dispatch(changeTodolistTitleAC(todolistId, title))
            dispatch(setStatus('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    }
    catch (e) {
        if (axios.isAxiosError<AxiosError<{ message: string }>>(e)) {
            const error = e.response ? e.response.data.message : e.message
            handleServerNetworkError(error, dispatch)
        }
    }
}

/////////// types

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType,
}
export type TodoListReducerActionType =
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof changeFilterAC>
    | ReturnType<typeof setTodoListsAC>
    | SetStatusType
    | ReturnType<typeof setEntityStatusAC>

