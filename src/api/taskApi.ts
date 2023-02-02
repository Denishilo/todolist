import {instance} from "./todolistApi";

export const taskAPI = {
    getTask(id: string) {
        return instance.get<GetResponseType>(`/todo-lists/${id}/tasks`)
    },
    createTask(todoListId: string, title: string) {
        return instance.post<ResponseType<DataType>>(`/todo-lists/${todoListId}/tasks`, {title})
    },
    updateTask(todoListId: string, taskId: string, obj: UpdateTaskType) {
        return instance.put<ResponseType<DataType>>(`/todo-lists/${todoListId}/tasks/${taskId}`, obj)
    },
    deleteTask(todoListId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todoListId}/tasks/${taskId}`)
    }
}

////// types

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskType = {
    title: string
    description: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

type GetResponseType = {
    items: TaskType[]
    totalCount: number
    error: string
}

export type DataType = {
    item: TaskType
}
type ResponseType<T = {}> = {
    resultCode: number
    messages: string[],
    data: T
}