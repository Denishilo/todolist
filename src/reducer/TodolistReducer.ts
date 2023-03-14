import {todolistAPI, TodolistType} from "../api/todolistAPI";
import {Dispatch} from "redux";
import {AppActionsType} from "../redux/store";
import {RequestStatusType, setError, setStatus, SetStatusType} from "./AppReducer";
import {AxiosError} from "axios";
import {RESULT_CODE} from "../app/App";
import {handleServerAppError, handleServerNetworkError} from "../utilits/errorUtilites";
import axios from "axios";
import {setTaskAC} from "./TaskReducer";

const initialState: TodolistDomainType[] = []

export const todolistReducer = (state: TodolistDomainType[] = initialState, action: TodoListReducerActionType): TodolistDomainType[] => {
    switch (action.type) {
        case TodolistActions.ADD_TODOLIST: {
            let newTodolist: TodolistDomainType = {
                id: action.payload.todolistId, title: action.payload.title, filter: 'all', addedDate: '',
                order: 0, entityStatus: 'idle'
            }
            return [newTodolist, ...state]
        }

        case TodolistActions.CHANGE_TODOLIST_TITTLE:
            return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)

        case TodolistActions.REMOVE_TODOLIST:
            return state.filter(el => el.id !== action.payload.id)

        case TodolistActions.CHANGE_FILTER:
            return state.map(el => el.id === action.payload.todolistId ? {...el, filter: action.payload.value} : el)

        case TodolistActions.SET_TODOS:
            return action.payload.arrayTodoList.map((tl) => ({...tl, filter: "all", entityStatus: 'idle'}))

        case TodolistActions.SET_ENTITY_STATUS:
            return state.map(tl => tl.id === action.payload.todolistId ? {
                ...tl,
                entityStatus: action.payload.entityStatus
            } : tl)

        default:
            return state
    }
}

////////////////////////// ACTION CREATORS ///////////////////////

export const addTodoListAC = (title: string,todoId:string) => ({
    type: TodolistActions.ADD_TODOLIST,
    payload: {title, todolistId: todoId} as const
})

export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: TodolistActions.CHANGE_TODOLIST_TITTLE,
    payload: {title, id} as const
})

export const removeTodolistAC = (id: string) => ({type: TodolistActions.REMOVE_TODOLIST, payload: {id} as const})

export const changeFilterAC = (value: FilterValuesType, todolistId: string) => ({
    type: TodolistActions.CHANGE_FILTER,
    payload: {value, todolistId} as const
})

export const setTodoListsAC = (arrayTodoList: TodolistType[]) => ({
    type: TodolistActions.SET_TODOS,
    payload: {arrayTodoList} as const
})

export const setEntityStatusAC = (todolistId: string, entityStatus: RequestStatusType) => ({
    type: TodolistActions.SET_ENTITY_STATUS, payload: {
        todolistId,
        entityStatus,
    } as const
})

////////////////////////// THUNK CREATORS ///////////////////////

export const getTodoListTC = () => (dispatch: Dispatch<TodoListReducerActionType>) => {
    dispatch(setStatus('loading'))
    todolistAPI.getTodoList()
        .then(res => {
            console.log('getTodo', res)
            dispatch(setTodoListsAC(res.data))
            dispatch(setStatus('succeeded'))
        })
        .catch(e => {
            handleServerNetworkError(e.message, dispatch)
        })
}

export const addTodoListTC = (title: string,todoId:string) => (dispatch: Dispatch<AppActionsType>) => {
    dispatch(setStatus('loading'))
    todolistAPI.createTodoList(title)
        .then(res => {
            if (res.data.resultCode === RESULT_CODE.SUCCESS) {
                console.log(res)
                dispatch(addTodoListAC(title,res.data.data.item.id))
                dispatch(setTaskAC(res.data.data.item.id,[]))
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
    todolistAPI.deleteTodoList(todolistId)
        .then(res => {
            if (res.data.resultCode === RESULT_CODE.SUCCESS) {
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
    try {
        let res = await todolistAPI.updateTodoList(todolistId, title)
        if (res.data.resultCode === RESULT_CODE.SUCCESS) {
            dispatch(changeTodolistTitleAC(todolistId, title))
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

//////////////////////////// types //////////////////
export const TodolistActions = {
    ADD_TODOLIST: 'ADD_TODOLIST',
    REMOVE_TODOLIST: 'REMOVE_TODOLIST',
    SET_TODOS: 'SET_TODOS',
    CHANGE_TODOLIST_TITTLE: 'CHANGE_TODOLIST_TITTLE',
    CHANGE_FILTER: 'CHANGE_FILTER',
    SET_ENTITY_STATUS: 'SET-ENTITY-STATUS',
} as const

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

