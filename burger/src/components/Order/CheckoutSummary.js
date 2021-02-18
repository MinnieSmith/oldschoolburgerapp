import React from 'react';
import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';
import './CheckoutSummary.css'

const checkoutSummary = (props) => {
    return (
        <div className="CheckoutSummary">
            
            <div style={{ width: '100%', margin: 'auto', textAlign: 'center' }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <p><large>We hope it tastes great!</large></p>
            <Button btnType="Danger"
            clicked={props.checkoutCancelled}>CANCEL</Button>
            <Button btnType="Success"
            clicked={props.checkoutContinued}>CONTINUE </Button>
        </div>
    );
}

export default checkoutSummary;
