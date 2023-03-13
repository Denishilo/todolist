import React, {ChangeEvent, FC, memo, useState} from 'react';
import TextField from '@mui/material/TextField';


export const EditableSpan: FC<PropsType> = memo(({value, onChange}) => {
    console.log('editable span....')
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState(value);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(value);
    }
    const activateViewMode = () => {
        setEditMode(false);
        onChange(title);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <TextField id="outlined-basic" label="Outlined" variant="outlined" value={title} onChange={changeTitle}
                     autoFocus onBlur={activateViewMode}/>
        : <span onDoubleClick={activateEditMode}>{value}</span>
})

///////////// types /////////////

type PropsType = {
    value: string
    onChange: (newValue: string) => void
}