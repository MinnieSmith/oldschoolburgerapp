import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            suburb: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Suburb'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            postcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Postcode'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 4,
                    maxLength: 4
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'pickup', displayValue: 'Pickup' },
                        { value: 'delivery', displayValue: 'Delivery' }
                    ]
                },
                value: 'pickup',
                validation: {},
                valid: true
            }
        },
        formIsvalid: false
        }

    /*because contactData ingreds props is in a form and by default the form
    gets reloaded, we have to manual prevent the default */
    orderHandler = (event) => {
        event.preventDefault();
        //Loops through the form to get the data
        const formData = {};
        for (let formElId in this.state.orderForm) {
            formData[formElId] = this.state.orderForm[formElId].value;
        }


        const orderdocket = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }

        this.props.onOrderBurger(orderdocket, this.props.token);
    }

    checkValidity(value, rules) {
        let isValid = true;

        if (rules.required) {
            //trim removes whitespaces at beginning and end
            //If the trimmed value is not an empty string, then isValid ==true 
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        //copies the pointer of the orderForm
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        //Actually creates a copy of the elements
        //This step is essential so we don't change the original orderform
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        //checks the updated form for validity
        updatedFormElement.valid = this.checkValidity(
            updatedFormElement.value,
            updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        // if any elements of the array is false, then it would set formIsValid to false and then it will make all the values false
        let formIsValid = true;
        for (let inputId in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputId].valid && formIsValid
        }

        this.setState({ orderForm: updatedOrderForm, formIsvalid: formIsValid });
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {/* Dynamically outputs elements in form  */}
                {formElementsArray.map(El => (
                    <Input
                        key={El.id}
                        elementType={El.config.elementType}
                        elementConfig={El.config.elementConfig}
                        value={El.config.value}
                        invalid={!El.config.valid}
                        shouldValidate={El.config.validation}
                        touched={El.config.touched}
                        //anon func () allows to pass args to inputChangedHandler
                        //two way binding 
                        changed={(event) => this.inputChangedHandler(event, El.id)}
                    ></Input>
                ))}
                <div>
                    <Button btnType="Success" disabled={!this.state.formIsvalid}>ORDER</Button>
                </div>
            </form>
        );
        if (this.props .loading) {
            form = <Spinner />;
        }
        return (
            <div className='ContactData'>
                <p> Enter your contact details</p>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));