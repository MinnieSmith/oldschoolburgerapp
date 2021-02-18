import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import BurgerBuilder from './ containers/BurgerBuilder/BurgerBuilder';
import Checkout from './ containers/Checkout/Checkout';
import Layout from './components/Layout/Layout';
import Orders from './ containers/Orders/Orders';
import Auth from './ containers/Auth/Auth';

class App extends Component {
  state = {
    show: true
  };

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component={Auth} />
            <Route path="/" component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;