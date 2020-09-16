import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Provider } from 'react-redux'
import store from './store'

import Products from './pages/Products';
import ModifyProduct from './pages/ModifyProduct';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Products} />
          <Route exact path="/edit-product" component={ModifyProduct} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
