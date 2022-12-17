import {TasksStateType} from '../App';
import {addTodoListAC, TodolistDomainType, TodoListReducer} from "./todoListReducer";
import {TaskReducer} from "./taskReducer";


test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];

    const action = addTodoListAC("new todolist");

    const endTasksState = TaskReducer(startTasksState, action)
    const endTodolistsState = TodoListReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.todolistId);
    expect(idFromTodolists).toBe(action.payload.todolistId);
});
