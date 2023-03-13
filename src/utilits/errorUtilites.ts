import { Dispatch } from 'redux'
import { ResponseType } from '../api/todolistAPI'
import {AppActionsType, setError, setStatus} from "../reducer/appReducer";

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch<AppActionsType>) => {
    if (data.messages.length) {
        dispatch(setError(data.messages[0]))
    } else {
        dispatch(setError('Some error occurred'))
    }
    dispatch(setStatus('failed'))
}

export const handleServerNetworkError = (error:string, dispatch: Dispatch<AppActionsType>) => {
    dispatch(setError(error))
    dispatch(setStatus('failed'))
}

