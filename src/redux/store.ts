import {AnyAction, applyMiddleware, combineReducers} from "redux";
import {taskReducer, TaskReducerActionType} from "../reducer/taskReducer";
import {todolistReducer, TodoListReducerActionType,} from "../reducer/todolistReducer";
import {legacy_createStore as createStore} from 'redux'
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer} from "../reducer/appReducer";

export const rootReducer = combineReducers({
    task: taskReducer,
    todoList: todolistReducer,
    app:appReducer,
})


export type RootReducerType = ReturnType<typeof rootReducer>
export type AppActionsType = TodoListReducerActionType | TaskReducerActionType
type ThunkAppDispatchType = ThunkDispatch<RootReducerType, any, AnyAction>

export const useAppDispatch = () => useDispatch<ThunkAppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<RootReducerType> = useSelector
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

// @ts-ignore
window.store = store;