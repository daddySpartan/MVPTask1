import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import CustHome from './components/Customers/CustHome';
import StoreHome from './components/Stores/StoreHome';
import ProductHome from './components/Products/ProductHome';
import SaleHome from './components/Sales/SaleHome';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/customer' component={CustHome} />
        <Route path='/store' component={StoreHome} />
        <Route path='/product' component={ProductHome} />
        <Route path='/sale' component={SaleHome} />
      </Layout> 
    );
  };
};
