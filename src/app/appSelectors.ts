import {RootReducerType} from "../redux/store";

export const statusSelector = (state:RootReducerType)=>state.app.status
export const isInitializedSelector = (state:RootReducerType)=>state.app.isInitialized
export const isLoginSelector = (state:RootReducerType)=>state.auth.isLoggedIn