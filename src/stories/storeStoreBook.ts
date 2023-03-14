import {applyMiddleware, combineReducers} from 'redux'
import { v1 } from 'uuid'
import {taskReducer} from "../reducer/TaskReducer";
import {FilterValuesType, todolistReducer} from "../reducer/TodolistReducer";
import {RootReducerType} from "../redux/store";
import { legacy_createStore as createStore} from 'redux'
import thunkMiddleware from "redux-thunk";
import {appReducer} from "../reducer/AppReducer";


const rootReducer = combineReducers({
    task:taskReducer,
    todoList:todolistReducer,
    app:appReducer
})

const initialGlobalState:RootReducerType = {
    todoList: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all' as FilterValuesType, order:0, addedDate:'',entityStatus: 'idle'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all' as FilterValuesType,order:0, addedDate:'',entityStatus: 'idle'}
    ],
    task: {
        ['todolistId1']: [
            {id: v1(), title: 'HTML&CSS', status: 0, completed:false, description:'', priority:0, addedDate:'', deadline:'', order:0, startDate:'', todoListId:"todolistId1"},
            {id: v1(), title: 'JS', status: 0, completed:false, description:'', priority:0, addedDate:'', deadline:'', order:0, startDate:'', todoListId:"todolistId1"}
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Milk', status: 2, completed:true, description:'', priority:0, addedDate:'', deadline:'', order:0, startDate:'', todoListId:"todolistId2"},
            {id: v1(), title: 'React Book', status: 2, completed:true, description:'', priority:0, addedDate:'', deadline:'', order:0, startDate:'', todoListId:"todolistId2"}
        ]
    },
    app:{
        status: 'loading',
        error: null,
        isInitialized:false
    },
    auth:{
        isLoggedIn: false,

    }

}

export const storyBookStore = createStore(rootReducer,applyMiddleware(thunkMiddleware))
