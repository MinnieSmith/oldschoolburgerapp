import React from 'react';
import './Item.css';
import {NavLink} from 'react-router-dom';

const item = (props) => (
    <li className='Item'>
        <NavLink
            to={props.link} exact={props.exact}
            activeClassName='active'>  {props.children}
        </NavLink>
    </li>
);

export default item;