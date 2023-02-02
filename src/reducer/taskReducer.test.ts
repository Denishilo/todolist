import {TasksStateType} from '../app/App';
import {addTaskAC, changeStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from "./taskReducer";
import {addTodoListAC, removeTodolistAC} from "./todolistReducer";

let startState: TasksStateType = {};
beforeEach(() => {
    startState = {
        "todolistId1": [
            { id: "1", title: "CSS", status: 0, completed:false, description:'', priority:0, addedDate:'', deadline:'', order:0, startDate:'', todoListId:"todolistId1"  },
            { id: "2", title: "JS", status: 2, completed:true, description:'', priority:0, addedDate:'', deadline:'', order:0, startDate:'', todoListId:"todolistId1" },
            { id: "3", title: "React", status: 0, completed:false, description:'', priority:0, addedDate:'', deadline:'', order:0, startDate:'', todoListId:"todolistId1" }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status: 0, completed:false, description:'', priority:0, addedDate:'', deadline:'', order:0, startDate:'', todoListId:"todolistId2" },
            { id: "2", title: "milk", status: 2, completed:true, description:'', priority:0, addedDate:'', deadline:'', order:0, startDate:'', todoListId:"todolistId2" },
            { id: "3", title: "tea", status: 0, completed:false, description:'', priority:0, addedDate:'', deadline:'', order:0, startDate:'', todoListId:"todolistId2" }
        ]
    };
});

test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC("todolistId2", '2');

    const endState = taskReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(2);
    expect(endState["todolistId2"].every(t => t.id != "2")).toBeTruthy();
});


// test('correct task should be added to correct array', () => {
//     let task = {
//         id: "4", title: "juce", status: 0, completed:false,
//         description:'', priority:0, addedDate:'', deadline:'',
//         order:0, startDate:'', todoListId:"todolistId2" }
//     const action = addTaskAC(task);
//
//     const endState = taskReducer(startState, action)
//
//     expect(endState["todolistId1"].length).toBe(3);
//     expect(endState["todolistId2"].length).toBe(4);
//     expect(endState["todolistId2"][0].id).toBeDefined();
//     expect(endState["todolistId2"][3].title).toBe("juce");
//     expect(endState["todolistId2"][0].status).toBe(0);
// });

test('status of specified task should be changed', () => {
    const action = changeStatusAC("todolistId2","2", 0 );

    const endState = taskReducer(startState, action)

    expect(endState["todolistId1"][1].status).toBe(2);
    expect(endState["todolistId2"][1].status).toBe(0);
});
test('title of specified task should be changed', () => {
    const action = changeTaskTitleAC("2", "yogurt", "todolistId2");

    const endState = taskReducer(startState, action)

    expect(endState["todolistId1"][1].title).toBe("JS");
    expect(endState["todolistId2"][1].title).toBe("yogurt");
    expect(endState["todolistId2"][0].title).toBe("bread");
});
test('new array should be added when new todolist is added', () => {
    const action = addTodoListAC("new todolist");

    const endState = taskReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});
test('propertry with todolistId should be deleted', () => {
    const action = removeTodolistAC("todolistId2");

    const endState = taskReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});
