import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

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

type ActionTypeTodoListReducer = addTodoListAC | changeTodolistTitleAC | removeTodolistAC | changeFilterAC

export const TodoListReducer = (state: TodolistType[], action: ActionTypeTodoListReducer): TodolistType[] => {
    switch (action.type) {
        case "ADD-TODOLIST": {
            let newTodolist: TodolistType = {id: action.payload.todolistId, title: action.payload.title, filter: 'all'};
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
    }
    return state
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
