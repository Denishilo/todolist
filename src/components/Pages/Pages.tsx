import {Navigate, Route, Routes} from "react-router-dom";
import {TodoListsList} from "../TodoListsList/todoListsList";
import {PATH} from "../../common/Constants/Path";
import {Login} from "../Login/login";
import React from "react";

export const Pages = () => {
    return (
        <Routes>
            <Route path={'/'} element={<TodoListsList/>}/>
            <Route path={PATH.LOGIN} element={<Login/>}/>
            <Route path={PATH.PAGE_NOT_FOUND} element={<h1>404: PAGE NOT FOUND</h1>}/>
            <Route path={'*'} element={<Navigate to={PATH.PAGE_NOT_FOUND}/>}/>
        </Routes>
    )
}