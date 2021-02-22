import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import App from "./сomponents/App";

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);