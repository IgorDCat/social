import * as React from "react";
import {render, screen} from '@testing-library/react';
import {App} from './App';
import {Provider} from "react-redux";
import store from "./redux/redux_store";
import {BrowserRouter} from "react-router-dom";


describe("App", () => {
    test('App renders', () => {

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <App id={1}/>
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByTestId('app')).toBeInTheDocument()
    });
})