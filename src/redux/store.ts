import {AnyAction, applyMiddleware, combineReducers} from "redux";
import {taskReducer} from "../reducer/taskReducer";
import {todolistReducer, } from "../reducer/todolistReducer";
import {legacy_createStore as createStore} from 'redux'
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export const rootReducer = combineReducers({
    task: taskReducer,
    todoList: todolistReducer
})

export type RootReducerType = ReturnType<typeof rootReducer>

type ThunkAppDispatchType = ThunkDispatch<RootReducerType, any, AnyAction>
export const useAppDispatch = () => useDispatch<ThunkAppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<RootReducerType> = useSelector
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))