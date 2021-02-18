import React from 'react';
import logoImage from '../../../src/assets/images/logo.png';
import './Logo.css';

const logo = (props) => (
    <div className='Logo'>
        {/* dynamically sets the logo source */}
        <img src={logoImage} alt='Ole School Burgers'/> 
    </div>    
);

export default logo;