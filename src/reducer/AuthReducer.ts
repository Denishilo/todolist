import {Dispatch} from 'redux'
import {AppActionsType, setIsInitializedAC, setStatus} from "./AppReducer";
import {authAPI, AuthRequestType, ResponseResultCode} from "../api/authAPI";
import {handleServerAppError, handleServerNetworkError} from "../utilits/errorUtilites";

const initialState = {
    isLoggedIn: false,
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_IS_LOGIN:
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
////////////////////// ACTION CREATORS ////////////////////////

export const setIsLoggedInAC = (value: boolean) =>
    ({type: SET_IS_LOGIN, value} as const)

//////////////////////// THUNK CREATORS ////////////////////////

export const loginTC = (data: AuthRequestType) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatus('loading'))
    try {
        let res = await authAPI.login(data)
        console.log(res)
        if (res.data.resultCode === ResponseResultCode.OK) {
            dispatch(setStatus('succeeded'))
            dispatch(setIsLoggedInAC(true))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        console.log(e)
        // @ts-ignore
        handleServerNetworkError(e, dispatch)
    }
}

export const meAuthTC = () => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatus('loading'))
    try {
        let res = await authAPI.authMe()
        if (res.data.resultCode === ResponseResultCode.OK) {
            dispatch(setStatus('succeeded'))
            dispatch(setIsLoggedInAC(true))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        // @ts-ignore
        handleServerNetworkError(e, dispatch)
    }
    finally {
        dispatch(setIsInitializedAC(true))
    }
}

////////////////// types ///////////////////
type ActionsType = ReturnType<typeof setIsLoggedInAC> | AppActionsType
type InitialStateType = typeof initialState
const SET_IS_LOGIN = 'SET_IS_LOGIN'