import {Dispatch} from 'redux'
import {AppActionsType, setIsInitializedAC, setStatus} from "../../reducer/appReducer";
import {authAPI, AuthRequestType, ResponseResultCode} from "../../api/authAPI";
import {handleServerAppError, handleServerNetworkError} from "../../utilits/errorUtilites";

const initialState = {
    isLoggedIn: false,
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}

        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: AuthRequestType) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatus('loading'))
    try {
        let res = await authAPI.login(data)
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

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | AppActionsType
