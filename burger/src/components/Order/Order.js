import React from 'react';
import './Order.css';

const order = (props) => {
    //another method turn a 2d array into a single array of ingred
    const ingredients = [];
    for (let ing in props.ingredients) {
        ingredients.push(
            {
                name: ing,
                amount: props.ingredients[ing]
            }
        );
    }

    const ingredientOutput = ingredients.map(ig => {
        return <span
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '2px 2px',
                pading: '5px'
            }}>
            {ig.name} ({ig.amount})</span>;
    });
    return (
        <div className='Order'>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price:<strong>$ {props.price.toFixed(1)}</strong></p>
        </div>
    );

};

export default order;