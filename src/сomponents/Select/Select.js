import React from 'react'

import './style.css'

function Select({selectList, updateId}) {
    return (
        <div className="select-dropdown">
            <select onChange={updateId} name="" id="">
                {selectList.length !== 0 ?
                    selectList.map((it, index) => <option key={index} value={index + 1}>{it}</option>)
                    :
                    null}
            </select>
        </div>
    )
}

export default Select