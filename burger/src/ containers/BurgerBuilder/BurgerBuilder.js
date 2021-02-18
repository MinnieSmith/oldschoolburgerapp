import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderAction from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
        // state is an object not an array
        order: false,
    }

    componentDidMount() {
        this.props.onInitIngredients();  
    }

    //function sets order to true
    orderHandler = () => {
        this.setState({ order: true });
    }

    orderCancelledHandler = () => {
        this.setState({ order: false });
    }

    orderProceedHandler = () => {
        this.props.onInitPurchase();
        //push allows us to access a page and push it on to the stack of pages
        this.props.history.push('/checkout');

    }
    // enables or disables the order button by passing in the ingredients array
    // to determine whether it is empty
    orderButtonState(ingredients) {
        //extracts the amount of each ingredient into the sums array
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            //reduce() is used in this case to get the sum of all el in array
            .reduce((sum, el) => {
                return sum + el;
            }, 0); //starting number of 0
        return sum > 0; //purchasebale if no. ingrd > 0    
    }


    render() {
        //copies the ingredients array into the disabledInfo array
        const disabledInfo = {
            ...this.props.ings
        };
        /*for each ingredient, the key is set to a boolean value, True if there
        are no more ingredients*/
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;

        //initally ingredients null and spinner is on until response comes back from firebase
        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
        //if there are ingredients, ie once it is fetched from firebase 
        if (this.props.ings) {
            burger = (
                <Aux>
                    {/* passes the ingredients object to the Burger component */}
                    <Burger ingredients={this.props.ings} />
                    {/*hook the addIngredientHandler function to the More button
                by passing a property to the buildcontrols. The ingredientsAdded
                property holds a reference the the addIngredientsHandler*/}
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.orderButtonState(this.props.ings)}
                        order={this.orderHandler}
                        price={this.props.price} />
                </Aux>
            );

            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                price={this.props.price}
                orderCancelled={this.orderCancelledHandler}
                orderContinue={this.orderProceedHandler} />;
        }
 

        return (
            <Aux>
                <Modal show={this.state.order} modalClosed={this.cancelOrderHandler}> {/*binds the modal to order boolean*/}
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderAction.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderAction.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderAction.initIngredients()),
        onInitPurchase: () => dispatch(burgerBuilderAction.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));