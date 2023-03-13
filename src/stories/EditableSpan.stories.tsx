import React, {ChangeEvent, useState} from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TextField from "@mui/material/TextField";
import {EditableSpan} from "../common/EditableSpan/EditableSpan";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";
import {storyBookStore} from "./storeStoreBook";
import {Provider, useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../redux/store";
import {changeTaskTitleAC} from "../reducer/taskReducer";
import {v1} from "uuid";

export default {
  title: 'TODOLIST/EditableSpan',
  component: EditableSpan,
  decorators:[ReduxStoreProviderDecorator],
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan>  = (args) => {
  let [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch()
  let task = useSelector((state: RootReducerType) => state.task['todolistId1'][0])

  const activateEditMode = () => {
    setEditMode(true);
    dispatch(changeTaskTitleAC(task.id, task.title, 'todolistId1'))
  }

  const activateViewMode = () => {
    setEditMode(false);
    dispatch(changeTaskTitleAC(task.id, task.title, 'todolistId1'))
  }

  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(changeTaskTitleAC(task.id, e.currentTarget.value, 'todolistId1'))
  }
  return editMode
        ? <TextField id="outlined-basic" label="Outlined" variant="outlined" value={task.title} onChange={changeTitle}
                     autoFocus onBlur={activateViewMode}/>
        : <span onDoubleClick={activateEditMode}>{task.title}</span>
  ;
}

const Test:ComponentStory<typeof EditableSpan> = (args) =>{
  return (
      <Provider store={storyBookStore}>
        <Template {...args}/>
      </Provider>
  )
}
export const EditableSpanStory = Test.bind({});
