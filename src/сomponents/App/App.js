import React from 'react'
import {Switch, Route} from "react-router-dom";

import Header from "../Header";
import Planets from "../Planets";
import Peoples from "../Peoples";
import Species from "../Species";

import axios from "axios";

import './style.css'


function App() {

    // функция получения данных
    const getData = (url) => {
        return axios.get(url)
    }

    return (
        <div className='App'>
            <Header />
            <Switch>
                <Route path='/planets'>
                    <Planets getData={getData} />
                </Route>
                <Route path='/peoples'>
                    <Peoples getData={getData} />
                </Route>
                <Route path='/species'>
                    <Species getData={getData} />
                </Route>
            </Switch>
        </div>
    )
}

export default App