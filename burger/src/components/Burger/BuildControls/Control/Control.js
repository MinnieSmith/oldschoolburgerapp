import React from 'react';
import './Control.css';

const controls = (props) => (
    <div className='Control'>
        <div className='Label'>{props.label}</div>
        <button className='Add' onClick={props.added}>More</button>
        {/* added a property that came from BuildControls */}
        <button className='Remove' onClick={props.removed} disabled={props.disabled}>Less</button>
    </div>
);

export default controls;