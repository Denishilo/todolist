import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolistAPI";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodoList()
            .then(res=>setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'INSTANCE'
        todolistAPI.createTodoList(title)
            .then(res=>setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const id = "5b4d24b3-2803-4694-b5a3-495ecc9a2c18";
        todolistAPI.deleteTodoList(id)
            .then(res=>setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let id = "db48c530-1648-44e1-8c18-20f4a4486b9f";
        let title = 'REDUX'
       todolistAPI.updateTodoList(id,title)
            .then(res=>setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

