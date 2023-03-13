import {AddItemForm} from "./AddItemForm";
import React, {FC} from "react";
import s from './AddItem.module.css'

export const AddItemFormWrapper:FC<PropsType> = ({addItem})=>{
    return (
        <div className={s.wrapper}>
            <AddItemForm addItem={addItem}/>
        </div>
    )
}

type PropsType = {
    addItem: (title: string) => void
}