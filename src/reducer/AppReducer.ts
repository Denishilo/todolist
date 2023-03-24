import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false
}
const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setIsInitialized: (state, action: PayloadAction<boolean>) => {
            state.isInitialized = action.payload
        },
        setStatus: (state, action: PayloadAction<RequestStatusType>) => {
            state.status = action.payload
        },
        setError: (state, action: PayloadAction<null | string>) => {
            state.error = action.payload
        }
    }
})
export const appReducer = appSlice.reducer
export const {setIsInitialized,setStatus,setError} = appSlice.actions

// export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
//     switch (action.type) {
//         case AppActions.SET_STATUS:
//             return {...state, status: action.payload.status}
//         case AppActions.SET_ERROR:
//             return {...state, error: action.payload.error}
//         case AppActions.SET_INITIALIZED:
//             return {...state, isInitialized: action.payload.value}
//         default:
//             return state
//     }
// }
//export const setIsInitialized = (value: boolean) => ({type: AppActions.SET_INITIALIZED, payload: {value}} as const)

// export const setStatus = (status: RequestStatusType) => {
//     return {
//         type: AppActions.SET_STATUS,
//         payload: {
//             status
//         }
//     } as const
// }
// export const setError = (error: null | string) => {
//     return {
//         type: AppActions.SET_ERROR,
//         payload: {
//             error
//         }
//     } as const
// }

//////////////// types //////////////


// export type InitialStateType = {
//     status: RequestStatusType,
//     error: null | string,
//     isInitialized: boolean,
// }

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

// const AppActions = {
//     SET_STATUS: 'SET_STATUS',
//     SET_ERROR: 'SET_ERROR',
//     SET_INITIALIZED: 'SET_INITIALIZED'
// } as const

export type SetStatusType = ReturnType<typeof setStatus>
export type SetErrorType = ReturnType<typeof setError>
export type AppActionsType = SetStatusType | SetErrorType | ReturnType<typeof setIsInitialized>