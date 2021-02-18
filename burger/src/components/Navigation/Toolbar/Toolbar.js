import React from 'react';
import './Toolbar.css';
import Logo from '../../../components/Logo/Logo';
import NavigationItem from '../../Navigation/NavigationItem/NavigationItem';
import DrawerToggle from '../../Navigation/SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
    <header className='Toolbar'>
        <DrawerToggle clicked={props.drawerToggleClicked}/>
        <div className='ToolbarLogo'>
            <Logo />
        </div>
        <nav className='DesktopOnly'><NavigationItem />
        </nav>
    </header>
);

export default toolbar;     