import React from "react";
import {Link} from "react-router-dom";

import './style.css'

function HeaderItem(props) {
    return (
        <li className="nav-item">
            <Link to={props.link} className="nav-link">{props.itemName}</Link>
        </li>
    )
}

export default HeaderItem;
