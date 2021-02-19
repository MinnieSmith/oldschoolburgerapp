import React from 'react';
import './NavigationItem.css';
import Item from './Item/Item';


let notAuthenticated =  <Item link="/auth">Login</Item>;
let isAuthenticated = <Item link="/logout">Logout</Item>;



const navigationItems = (props) => (

    <ul className='NavigationItem'>
        <Item link="/" exact>Burger</Item>
        {props.isAuthenticated? <Item link="/orders">Orders</Item>: null}
        {props.isAuthenticated? isAuthenticated: notAuthenticated}
    </ul>
);

export default navigationItems;