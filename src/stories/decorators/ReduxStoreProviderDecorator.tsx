import React from "react";
import {Provider} from "react-redux";
import {storyBookStore} from "../storeStoreBook";

export const ReduxStoreProviderDecorator = (storyFunc: any) => {
    return <Provider store={storyBookStore}>
        {storyFunc()}
    </Provider>
}