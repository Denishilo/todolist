import React, {ChangeEvent, FC, KeyboardEvent, memo, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import s from './AddItem.module.css'

export const AddItemForm: FC<PropsType> = memo(({addItem, disable}) => {
    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (title.trim() !== "") {
            addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error) {
            setError(null);
        }
        if (e.charCode === 13) {
            addItemHandler();
        }
    }

    return <div className={s.wrapper}>
        <TextField id="outlined-basic" label={error ? "Title is required" : 'Title'} variant="outlined"
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   error={!!error}
                   style={{width: '230px'}}
                   size={"small"}
                   disabled={disable}
        />
        <Button onClick={addItemHandler} variant="contained" disabled={disable}
                style={{maxWidth: '15%', height: '40px', minWidth: '30px', minHeight: '30px'}}>+</Button>
    </div>
})

/////////// types //////////////

type PropsType = {
    addItem: (title: string) => void
    disable?: boolean
}