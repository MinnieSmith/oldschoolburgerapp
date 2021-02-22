import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import BurgerBuilder from './ containers/BurgerBuilder/BurgerBuilder';
import { connect } from 'react-redux';
import Layout from './components/Layout/Layout';
import Logout from './ containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asynComponent/asynComponent';
import './App.css';

//asyncComponents ensure that the components are only loaded when needed!
const asyncCheckout = asyncComponent(() => {
  return import('./ containers/Checkout/Checkout');
});
const asyncOrders = asyncComponent(() => {
  return import('./ containers/Orders/Orders');
}); 
const asyncAuth = asyncComponent(() => {
  return import('./ containers/Auth/Auth');
});


class App extends Component {
  componentDidMount() {
    this.props.onTyrAutoSignin();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" component={BurgerBuilder} />
        {/* Redirect defaults back to "/" for any 'unknown' routes */}
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTyrAutoSignin: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
