import axios from "axios";


const instanceTask = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': "f746c884-1e65-41cc-803b-7578faa18b3d"
    }
})

type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type GetResponseType = {
    items:TaskType[]
    totalCount:number
    error:string
}

type DataType = {
    item:TaskType
}
type ResponseType<T={}> = {
    resultCode: number
    messages: string[],
    data: T
}

export const taskAPI = {
    getTask(id: string) {
        return instanceTask.get<GetResponseType>(`/todo-lists/${id}/tasks`)
    },
    createTask(todoListId: string, title: string) {
        return instanceTask.post<ResponseType<DataType>>(`/todo-lists/${todoListId}/tasks`, {title})
    },
    updateTask(todoListId:string, taskId:string, obj:object){
        return instanceTask.put<ResponseType<DataType>>(`/todo-lists/${todoListId}/tasks/${taskId}`, obj)
    },
    deleteTask(todoListId:string, taskId:string){
        return instanceTask.delete<ResponseType>(`/todo-lists/${todoListId}/tasks/${taskId}`)
    }
}