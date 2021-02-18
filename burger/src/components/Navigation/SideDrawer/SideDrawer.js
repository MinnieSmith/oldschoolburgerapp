import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItem from '../NavigationItem/NavigationItem';
import './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';

const sideDrawer = (props) => {
    let attachedClasses = ['SideDrawer', 'Close'];
    if(props.open) {
        attachedClasses = ['SideDrawer', 'Open'];
    }

    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className='SideDrawerLogo'>
                    <Logo />
                </div>
                <nav>
                    <NavigationItem />
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;  