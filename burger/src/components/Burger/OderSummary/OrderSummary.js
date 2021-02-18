import React from 'react';
import Aux from '../../../hoc/Aux';
import './OrderSummary.css';
import Button from '../../UI/Button/Button'


const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
        return <li key={igKey}>
            <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
            </li>
    });
    return (
        <Aux>
            
            <p className='Summarytitle'>Your Order</p>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: ${props.price.toFixed(1)}</strong></p>
            <div className="OrderSummaryButton">
            <Button btnType="Success" clicked={props.orderContinue}>Proceed</Button>
            <Button btnType="Danger" clicked={props.orderCancelled}>Cancel</Button> 
            </div>
        </Aux>
    )
};

export default orderSummary;