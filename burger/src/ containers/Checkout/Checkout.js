import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary";
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ContactData from './ContactData/ContactData';
import * as actions from '../../store/actions/index';

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        //goBack goes back to the last page 
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to="/" />
        
        if (this.props.ings) {
            const purchaseRedirect = this.props.purchased ? <Redirect to="/"/>: null;
            summary =

                <div>
                    {purchaseRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler} />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData}
                    /*render manually renders the nested route and allows to pass
                    ingredients and price in the contactData as a prop
                    also because it is rendered manually, history needs to 
                    be pushed onto the ContactData component by copying in 
                    the props array*/
                    />
                </div>

        }

        return summary
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder. ingredients,
        purchased: state.order.purchased
    }
}


export default connect(mapStateToProps)(Checkout);