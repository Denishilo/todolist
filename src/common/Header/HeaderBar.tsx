import React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useSelector} from "react-redux";
import {isLoginSelector} from "../../app/appSelectors";
import {useAppDispatch} from "../../redux/store";
import {logOutTC} from "../../reducer/AuthReducer";

export const HeaderBar = () => {
    const dispatch = useAppDispatch()

    const isLogin = useSelector(isLoginSelector)

    const onClickHandler = () => {
        dispatch(logOutTC())
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{flexGrow: 1, marginLeft: 3}}>
                    ToDoList
                </Typography>
                <Button onClick={onClickHandler} color="inherit">{isLogin ? 'Log Out' : ''}</Button>
            </Toolbar>
        </AppBar>
    )
}