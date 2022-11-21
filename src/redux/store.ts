import {combineReducers} from "redux";
import {TaskReducer} from "../reducer/taskReducer";
import {TodoListReducer} from "../reducer/todoListReducer";
import { legacy_createStore as createStore} from 'redux'

export const rootReducer = combineReducers({
    task:TaskReducer,
    todoList:TodoListReducer
})

export type RootReducerType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)