import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import App from "../App";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";

export default {
  title: 'TODOLIST/App',
  decorators:[ReduxStoreProviderDecorator],
  component: App,
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = (args) => <App/>;

export const AppStory = Template.bind({});

