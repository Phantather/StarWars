import React from 'react'

import Select from "../Select";

import './style.css'

function Form({formName, sendData, selectData, updateId}) {
    return (
        <form onSubmit={sendData}>
            <h2 className="text-center">{formName}</h2>
            <div className='search-form'>
                <Select selectList={selectData} updateId={updateId}/>
                <button className="search-button">SEARCH</button>
            </div>
        </form>
    )
}

export default Form