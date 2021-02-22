import React from 'react'

import preloder from '../../images/SWPreloader.svg'

import './style.css'

function Preloader() {
    return (
        <div className='preloader-block'>
            <img src={preloder} alt=""/>
        </div>
    )
}

export default Preloader