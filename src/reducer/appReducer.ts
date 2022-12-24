export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null
}

export type InitialStateType = {
    status: RequestStatusType,
    error: null | string
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.payload.status}
        case "APP/SET-ERROR":
            return {...state, error:action.payload.error}
        default:
            return state
    }
}
export type SetStatusType = ReturnType<typeof setStatus>
export type SetErrorType = ReturnType<typeof setError>
export type AppActionsType = SetStatusType | SetErrorType

export const setStatus = (status: RequestStatusType) => {
    return {
        type: 'APP/SET-STATUS',
        payload: {
            status
        }
    } as const
}
export const setError = (error: null | string) => {
    return {
        type: 'APP/SET-ERROR',
        payload: {
            error
        }
    } as const
}