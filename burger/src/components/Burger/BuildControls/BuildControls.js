import React from 'react';
import './BuildControls.css'; 
import Controls from './Control/Control';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Meat', type: 'meat'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Bacon', type: 'bacon'},
];

const buildControls = (props) => (
    <div className='BuildControls'>
        <p><strong>Price: $ {props.price.toFixed(1)}</strong></p>
        {controls.map(control => (
            <Controls 
            key={control.label} 
            label={control.label} 
            added={() => props.ingredientAdded(control.type)}
            /*props.ingredientAdded refers to property created in BuildControl tags 
            in BurgerBuilder.js. The added property then needs to be passed on to
            the more button*/
            removed={()=> props.ingredientRemoved(control.type)}
            disabled={props.disabled[control.type]}/>
        ))}
        <button className='OrderButton'
        disabled={!props.purchasable}
        onClick={props.order}>{props.isAuth? 'ORDER': 'LOGIN'}</button>
    </div>
);

export default buildControls;