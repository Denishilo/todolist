export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null,
    isInitialized: false
}

export type InitialStateType = {
    status: RequestStatusType,
    error: null | string,
    isInitialized: boolean,
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.payload.status}
        case "APP/SET-ERROR":
            return {...state, error: action.payload.error}
        case "APP/SET-INITIALIZED":
            return {...state, isInitialized: action.payload.value}
        default:
            return state
    }
}
export const setIsInitializedAC = (value: boolean) => ({type: 'APP/SET-INITIALIZED', payload: {value}} as const)
export type SetStatusType = ReturnType<typeof setStatus>
export type SetErrorType = ReturnType<typeof setError>
export type AppActionsType = SetStatusType | SetErrorType | ReturnType<typeof setIsInitializedAC>

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