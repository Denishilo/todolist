import React, {ChangeEvent} from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {Task} from "../Task";
import {Provider, useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../redux/store";
import {changeStatusAC, changeTaskTitleAC} from "../reducer/taskReducer";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../EditableSpan";
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
      isDone:true,
      title:'sssss',
      id:'132'
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
    let newIsDoneValue = e.currentTarget.checked;
    dispatch(changeStatusAC(task.id, newIsDoneValue, todolistId))
  }

  const onTitleChangeHandler = (newValue: string) => {
    dispatch(changeTaskTitleAC(task.id, newValue, todolistId))
  }
  return  <div className={task.isDone ? "is-done" : ""}>
    <Checkbox onChange={onChangeHandler} checked={task.isDone} color='default'/>
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