import React from 'react'

import planetImage from '../../images/planet.png'
import './style.css'

function Error() {
    return (
        <div className="error">
            <img src={planetImage} alt=""/>
            <h2>Oops, something wrong!</h2>
        </div>
    )
}

export default Error