import React, {useEffect, useState} from 'react'
import {todoListAPI} from "../api/todolistApi";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListAPI.getTodoList()
            .then(res=>setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'INSTANCE'
        todoListAPI.createTodoList(title)
            .then(res=>setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const id = "5b4d24b3-2803-4694-b5a3-495ecc9a2c18";
        todoListAPI.deleteTodoList(id)
            .then(res=>setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let id = "db48c530-1648-44e1-8c18-20f4a4486b9f";
        let title = 'REDUX'
       todoListAPI.updateTodoList(id,title)
            .then(res=>setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

