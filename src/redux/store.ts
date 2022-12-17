import {AnyAction, applyMiddleware, combineReducers} from "redux";
import {TaskReducer} from "../reducer/taskReducer";
import {TodoListReducer} from "../reducer/todoListReducer";
import {legacy_createStore as createStore} from 'redux'
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export const rootReducer = combineReducers({
    task: TaskReducer,
    todoList: TodoListReducer
})

export type RootReducerType = ReturnType<typeof rootReducer>

type ThunkAppDispatchType = ThunkDispatch<RootReducerType, any, AnyAction>
export const useAppDispatch = () => useDispatch<ThunkAppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<RootReducerType> = useSelector
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))