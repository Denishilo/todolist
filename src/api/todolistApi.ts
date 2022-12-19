import axios from "axios";

const instanceTodo = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': "f746c884-1e65-41cc-803b-7578faa18b3d"
    }
})

export const todoListAPI = {
    getTodoList() {
        return instanceTodo.get<Array<TodolistType>>('/todo-lists')
    },
    createTodoList(title: string) {
        return instanceTodo.post<ResponseType<{ item: TodolistType }>>('/todo-lists', {title})
    },
    updateTodoList(id: string, title: string) {
        return instanceTodo.put<ResponseType>(`/todo-lists/${id}`, {title})
    },
    deleteTodoList(id: string) {
        return instanceTodo.delete<ResponseType>(`/todo-lists/${id}`)
    }
}

/////// types
export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type ResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}
