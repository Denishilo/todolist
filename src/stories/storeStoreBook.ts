import { combineReducers } from 'redux'
import { v1 } from 'uuid'
import {TaskReducer} from "../reducer/taskReducer";
import {TodoListReducer} from "../reducer/todoListReducer";
import {RootReducerType} from "../redux/store";
import { legacy_createStore as createStore} from 'redux'
import {FilterValuesType} from "../App";


const rootReducer = combineReducers({
    task:TaskReducer,
    todoList:TodoListReducer
})

const initialGlobalState:RootReducerType = {
    todoList: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all' as FilterValuesType},
        {id: 'todolistId2', title: 'What to buy', filter: 'all' as FilterValuesType}
    ],
    task: {
        ['todolistId1']: [
            {id: v1(), title: 'HTML&CSS', isDone: false},
            {id: v1(), title: 'JS', isDone: false}
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'React Book', isDone: true}
        ]
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as RootReducerType)
