import {TasksStateType} from "../App";
import {v1} from "uuid";
import {addTodoListAC, removeTodolistAC, setTodoListsAC} from "./todoListReducer";
import {taskAPI, TaskStatuses, TaskType} from "../api/taskApi";
import {Dispatch} from "redux";

type removeTaskAC = {
    type: 'REMOVE-TASK',
    payload: {
        todolistId: string
        id: string
    }
}

type addTaskAC = {
    type: 'ADD-TASK',
    payload: {
        title: string
        todolistId: string
    }
}

type changeStatusAC = {
    type: 'CHANGE-STATUS',
    payload: {
        id: string
        status: TaskStatuses
        todolistId: string
    }
}

type changeTaskTitleAC = {
    type: 'CHANGE-TASK-TITLE',
    payload: {
        id: string
        newTitle: string
        todolistId: string
    }
}

type SetTaskACType = {
    type: 'SET-TASKS',
    payload: {
        tasks: TaskType[],
        todoListId: string
    }
}
const initialState: TasksStateType = {}


type TaskReducerActionType =
    removeTaskAC
    | addTaskAC
    | changeStatusAC
    | changeTaskTitleAC
    | addTodoListAC
    | removeTodolistAC
    | setTodoListsAC
    | SetTaskACType

export const TaskReducer = (state: TasksStateType = initialState, action: TaskReducerActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return ({
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.id)
            })
        }
        case "ADD-TASK": {
            let newTask: TaskType = {
                id: v1(), title: action.payload.title, status: 0, todoListId: action.payload.todolistId,
                startDate: '', deadline: '', order: 0, addedDate: '', priority: 0, description: '', completed: false
            };
            return ({
                ...state,
                [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]
            })
        }
        case "CHANGE-STATUS": {
            return ({
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.id ? {
                    ...el,
                    status: action.payload.status
                } : el)
            })
        }
        case "CHANGE-TASK-TITLE": {
            return ({
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.id ? {
                    ...el,
                    title: action.payload.newTitle
                } : el)
            })
        }
        case "ADD-TODOLIST": {
            return ({
                ...state,
                [action.payload.todolistId]: [],
            })
        }
        case "REMOVE-TODOLIST": {
            delete state[action.payload.id]
            return ({
                ...state
            })
        }
        case "SET-TODOS":
            let copyState = {...state}
            action.payload.arrayTodoList.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        case "SET-TASKS":
            return {...state, [action.payload.todoListId]: action.payload.tasks}

        default: {
            return state
        }
    }
}

export const removeTaskAC = (todolistId: string, id: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todolistId,
            id,
        }
    } as const
}

export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            title,
            todolistId,
        }
    } as const
}

export const changeStatusAC = (id: string, status: TaskStatuses, todolistId: string) => {
    return {
        type: 'CHANGE-STATUS',
        payload: {
            id,
            status,
            todolistId,
        }
    } as const
}

export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            id,
            newTitle,
            todolistId,
        }
    } as const
}

export const setTaskAC = (todoListId: string, tasks: TaskType[]): SetTaskACType => {
    return {
        type: 'SET-TASKS',
        payload: {
            tasks,
            todoListId
        }
    } as const
}

export const getTasksTC = (todoListId: string) => (dispatch: Dispatch) => {
    taskAPI.getTask(todoListId)
        .then(res => dispatch(setTaskAC(todoListId, res.data.items)))
}

export const removeTaskTC = (todoListId: string, taskId: string) => (dispath: Dispatch) => {
    taskAPI.deleteTask(todoListId, taskId)
        .then(res => dispath(removeTaskAC(todoListId, taskId)))
}
