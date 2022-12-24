import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type AddItemFormPropsType = {
    addItem: (title: string) => void
    disable?: boolean
}

export const AddItemForm = memo((props: AddItemFormPropsType) => {
    console.log('add item form re-render ....')
    let {disable} = props
    console.log('disable', disable)
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
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
            addItem();
        }
    }

    return <div>
        <TextField id="outlined-basic" label={error ? "Title is required" : 'Title'} variant="outlined"
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   error={!!error}
                   style={{width: '230px'}}
                   size={"small"}
                   disabled={disable}
                   />
        <Button onClick={addItem} variant="contained" disabled={disable}
                style={{maxWidth: '15%', height: '40px', minWidth: '30px', minHeight: '30px'}}>+</Button>
    </div>
})
