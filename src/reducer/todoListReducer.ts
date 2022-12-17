import {v1} from "uuid";
import {todoListAPI, TodolistType} from "../api/todolistApi";
import {Dispatch} from "redux";

export type addTodoListAC = {
    type: 'ADD-TODOLIST',
    payload: {
        title: string
        todolistId: string
    }
}

type changeTodolistTitleAC = {
    type: 'CHANGE-TODOLIST-TITTLE',
    payload: {
        title: string
        id: string
    }
}

export type removeTodolistAC = {
    type: 'REMOVE-TODOLIST',
    payload: {
        id: string
    }
}

type changeFilterAC = {
    type: 'CHANGE-FILTER',
    payload: {
        value: FilterValuesType
        todolistId: string
    }
}

export type setTodoListsAC = {
    type: 'SET-TODOS',
    payload: {
        arrayTodoList: TodolistType[]
    }
}

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}
const initialState: TodolistDomainType[] = []
type ActionTypeTodoListReducer =
    addTodoListAC
    | changeTodolistTitleAC
    | removeTodolistAC
    | changeFilterAC
    | setTodoListsAC

export const TodoListReducer = (state: TodolistDomainType[] = initialState, action: ActionTypeTodoListReducer): TodolistDomainType[] => {
    switch (action.type) {
        case "ADD-TODOLIST": {
            let newTodolist: TodolistDomainType = {
                id: action.payload.todolistId, title: action.payload.title, filter: 'all', addedDate: '',
                order: 0
            };
            return (
                [newTodolist, ...state]
            )
        }
        case "CHANGE-TODOLIST-TITTLE": {
            return (
                state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)
            )
        }
        case "REMOVE-TODOLIST": {
            return (
                state.filter(el => el.id !== action.payload.id)
            )
        }
        case "CHANGE-FILTER": {
            return (
                state.map(el => el.id === action.payload.todolistId ? {...el, filter: action.payload.value} : el)
            )
        }
        case "SET-TODOS": {
            console.log('set todos')
            return action.payload.arrayTodoList.map((tl) => ({...tl, filter: "all"}))
        }
        default: {
            return state
        }
    }

}
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

export const setTodoLists = (arrayTodoList: TodolistType[]): setTodoListsAC => {
    return {
        type: 'SET-TODOS',
        payload: {
            arrayTodoList
        }
    } as const
}
export const getTodoListTC = () => (dispatch: Dispatch) => {
    todoListAPI.getTodoList()
        .then(res => dispatch(setTodoLists(res.data)))
}