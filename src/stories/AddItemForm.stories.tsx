import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AddItemForm } from '../AddItemForm';
import {action} from "@storybook/addon-actions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default {
  title: 'TODOLIST/AddItemForm',
  component: AddItemForm,
  argTypes: {
    addItem:{
      description:'Button clicked inside form'
    }
  },
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormStory = Template.bind({});

AddItemFormStory.args = {
    addItem:action('Button clicked')
};


const TemplateWithError: ComponentStory<typeof AddItemForm> = (args) => {

  let [title, setTitle] = useState("")
  let [error, setError] = useState<string | null>("Title is required")

  const addItem = () => {
    if (title.trim() !== "") {
      args.addItem(title);
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
               style={{width: '85%'}}
               size={"small"}/>
    <Button onClick={addItem} variant="contained"
            style={{maxWidth: '15%', height: '40px', minWidth: '30px', minHeight: '30px'}}>+</Button>
  </div>
};

export const AddItemFormWithErrorStory  = TemplateWithError.bind({});