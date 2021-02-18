import React from 'react';
import './NavigationItem.css';
import Item from './Item/Item';

const navigationItems = () => (
    <ul className='NavigationItem'>
        <Item link ="/" exact>Burger</Item>
        <Item link="/orders">Orders</Item>
        <Item link="/auth">SignUp</Item>
        <Item link="/login">Login</Item>
    </ul>
);

export default navigationItems;