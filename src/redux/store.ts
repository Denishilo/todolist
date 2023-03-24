import {AnyAction} from "redux";
import {taskReducer, TaskReducerActionType} from "../reducer/TaskReducer";
import {todolistReducer, TodoListReducerActionType,} from "../reducer/TodolistReducer";
import {ThunkDispatch} from 'redux-thunk'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer} from "../reducer/AppReducer";
import {authReducer} from "../reducer/AuthReducer";
import {configureStore} from "@reduxjs/toolkit";
import { combineReducers } from '@reduxjs/toolkit'

export const rootReducer = combineReducers({
    task: taskReducer,
    todoList: todolistReducer,
    app:appReducer,
    auth: authReducer,
})

export type RootReducerType = ReturnType<typeof store.getState>
export type AppActionsType = TodoListReducerActionType | TaskReducerActionType
export type ThunkAppDispatchType = ThunkDispatch<RootReducerType, any, AnyAction>

export const useAppDispatch = () => useDispatch<ThunkAppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<RootReducerType> = useSelector
export const store = configureStore({
    reducer:rootReducer
})



// export const rootReducer = combineReducers({
//     task: taskReducer,
//     todoList: todolistReducer,
//     app:appReducer,
//     auth: authReducer,
// })
//
// export type RootReducerType = ReturnType<typeof rootReducer>
// export type AppActionsType = TodoListReducerActionType | TaskReducerActionType
// export type ThunkAppDispatchType = ThunkDispatch<RootReducerType, any, AnyAction>
//
// export const useAppDispatch = () => useDispatch<ThunkAppDispatchType>()
// export const useAppSelector: TypedUseSelectorHook<RootReducerType> = useSelector
// export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
// @ts-ignore
window.store = store;