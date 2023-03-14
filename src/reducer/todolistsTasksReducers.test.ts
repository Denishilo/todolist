import {TasksStateType} from '../app/App';
import {addTodoListAC, TodolistDomainType, todolistReducer} from "./TodolistReducer";
import {taskReducer} from "./TaskReducer";


// test('ids should be equals', () => {
//     const startTasksState: TasksStateType = {};
//     const startTodolistsState: Array<TodolistDomainType> = [];
//
//     const action = addTodoListAC("new todolist");
//
//     const endTasksState = taskReducer(startTasksState, action)
//     const endTodolistsState = todolistReducer(startTodolistsState, action)
//
//     const keys = Object.keys(endTasksState);
//     const idFromTasks = keys[0];
//     const idFromTodolists = endTodolistsState[0].id;
//
//     expect(idFromTasks).toBe(action.payload.todolistId);
//     expect(idFromTodolists).toBe(action.payload.todolistId);
// });
