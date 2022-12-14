import axios from "axios";


const instanceTask = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': "f746c884-1e65-41cc-803b-7578faa18b3d"
    }
})

export const taskAPI = {
    getTask(id: string) {
        return instanceTask.get(`/todo-lists/${id}/tasks`)
    },
    createTask(todoListId: string, title: string) {
        return instanceTask.post(`/todo-lists/${todoListId}/tasks`, {title})
    },
    updateTask(todoListId:string, taskId:string, obj:object){
        return instanceTask.put(`/todo-lists/${todoListId}/tasks/${taskId}`, obj)
    },
    deleteTask(todoListId:string, taskId:string){
        return instanceTask.delete(`/todo-lists/${todoListId}/tasks/${taskId}`)
    }
}