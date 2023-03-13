import {RootReducerType} from "../../redux/store";

export const isLoggedInSelector = (state:RootReducerType)=>state.auth.isLoggedIn
export const todoListSelector = (state:RootReducerType)=>state.todoList