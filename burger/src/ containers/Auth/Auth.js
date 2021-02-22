import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';

import Spinner from '../../components/UI/Spinner/Spinner'; 
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import './Auth.css';
import * as actions from '../../store/actions/index';


class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '', 
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 8
                },
                valid: false,
                touched: false
            }
        },
        signUp: false
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    componentDidMount() {
        //resets the page if burgerbuilder if '/' not reached while building a burger
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }          
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({ controls: updatedControls });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(
            this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.signUp
        );
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { signUp: !prevState.signUp };
        })
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElementsArray.map(El => (
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
            />
        ));

        if (this.props.loading) {
            form = <Spinner/>
        }

        let errorMessage = null;
        if(this.props.error) {
            if (this.props.error.message === "INVALID_EMAIL") {
                errorMessage = (
                    <p className = "ErrorMessage">the email is invalid</p>
                );
            };
            if (this.props.error.message === "INVALID_PASSWORD") {
                errorMessage = (
                    <p className = "ErrorMessage">the password is invalid</p>
                );
            };
        
            if (this.props.error.message === "EMAIL_EXISTS") {
                errorMessage = (
                    <p className = "ErrorMessage">the email has already exists</p>
                );
            };
            if (this.props.error.message === "TOO_MANY_ATTEMPTS_TRY_LATER") {
                errorMessage = (
                    <p className = "ErrorMessage">too many attempts, please try again later</p>
                );
            };
            if (this.props.error.message === "EMAIL_NOT_FOUND") {
                errorMessage = (
                    <p className = "ErrorMessage">email has not been registered, please sign up!</p>
                );
            };
            if (this.props.error.message === "USER_DISABLED") {
                errorMessage = (
                    <p className = "ErrorMessage">this account has been disabled!</p>
                );
            };  
        };

        let authRedirect = null;
        if(this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }

        return (
            <div className='Auth'>
                <p>{this.state.signUp ? 'Sign up with your email' : 'Login with your email'}</p>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">Submit</Button>
                </form>
                <p>{this.state.signUp ? 'Already registered?' : 'Not yet registered?'}</p>
                <Button
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger"> {this.state.signUp ? 'Login' : 'Sign Up'}</Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, signUp) => dispatch(actions.auth(email, password, signUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps , mapDispatchToProps)(Auth);