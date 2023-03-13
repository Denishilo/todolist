import React, {ChangeEvent} from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {Task} from "../components/Task/Task";
import {Provider, useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../redux/store";
import {changeStatusAC, changeTaskTitleAC} from "../reducer/taskReducer";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../common/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {action} from "@storybook/addon-actions";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";
import {storyBookStore} from "./storeStoreBook";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'TODOLIST/Task',
  component: Task,
  decorators:[ReduxStoreProviderDecorator],
  args:{
    task:{
      status:2,
      title:'sssss',
      id:'132',
      order:0,
      priority:0,
      deadline:'', startDate:'', addedDate:'', completed:true, description: '', todoListId:'totodolistId1'
    },
    todolistId: 'totodolistId1',
  }
} as ComponentMeta<typeof Task>;

const TemplateWork: ComponentStory<typeof Task> = (args) => {   //как обернуть в провайдер
  //let {todolistId} = args
  let todolistId = 'todolistId1'
  let task = useSelector((state:RootReducerType) => state.task['todolistId1'][0])
  console.log(task)
  //let {isDone, title, id} = args.task
  console.log('args', args)


  const dispatch = useDispatch()
  const onClickHandler = action('remove-task')
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let statusValue = e.currentTarget.checked ? 2 : 0;
    dispatch(changeStatusAC(todolistId,task.id, statusValue))
  }

  const onTitleChangeHandler = (newValue: string) => {
    dispatch(changeTaskTitleAC(task.id, newValue, todolistId))
  }
  return  <div className={task.status === 2 ? "is-done" : ""}>
    <Checkbox onChange={onChangeHandler} checked={task.status === 2} color='default'/>
    <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
    <IconButton onClick={onClickHandler} aria-label="delete">
      <DeleteIcon/>
    </IconButton>
  </div>
};

const Test:ComponentStory<typeof Task> = (args)=>{

  return (
      <Provider store={storyBookStore}>
        <TemplateWork {...args}/>
      </Provider>

  )
}
//export const TaskWorkStory = TemplateWork.bind({});
export const TaskWorkStory = Test.bind({});