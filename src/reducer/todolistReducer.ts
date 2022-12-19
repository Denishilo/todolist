import {v1} from "uuid";
import {todoListAPI, TodolistType} from "../api/todolistApi";
import {Dispatch} from "redux";

const initialState: TodolistDomainType[] = []

export const todolistReducer = (state: TodolistDomainType[] = initialState, action: ActionTypeTodoListReducer): TodolistDomainType[] => {
    switch (action.type) {
        case "ADD-TODOLIST": {
            let newTodolist: TodolistDomainType = {
                id: action.payload.todolistId, title: action.payload.title, filter: 'all', addedDate: '',
                order: 0
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
            return action.payload.arrayTodoList.map((tl) => ({...tl, filter: "all"}))

        default: return state
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

export const setTodoListsAC = (arrayTodoList: TodolistType[])=> {
    return {
        type: 'SET-TODOS',
        payload: {
            arrayTodoList
        }
    } as const
}

////////////////////////// THUNK CREATORS ///////////////////////

export const getTodoListTC = () => (dispatch: Dispatch<ActionTypeTodoListReducer>) => {
    todoListAPI.getTodoList()
        .then(res => dispatch(setTodoListsAC(res.data)))
}

export const addTodoListTC = (title: string) => (dispatch: Dispatch<ActionTypeTodoListReducer>) => {
    todoListAPI.createTodoList(title)
        .then(res => dispatch(addTodoListAC(title)))
}

export const deleteTodoListTC = (todolistId:string)=>(dispatch:Dispatch<ActionTypeTodoListReducer>)=>{
    todoListAPI.deleteTodoList(todolistId)
        .then(res=>dispatch(removeTodolistAC(todolistId)))
}

export const changeTitleTodolistTC=(todolistId:string,title:string)=>(dispatch:Dispatch<ActionTypeTodoListReducer>)=>{
    todoListAPI.updateTodoList(todolistId,title)
        .then(res=>dispatch(changeTodolistTitleAC(todolistId,title)))
}

/////////// types

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}
type ActionTypeTodoListReducer =
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof changeFilterAC>
    | ReturnType<typeof setTodoListsAC>