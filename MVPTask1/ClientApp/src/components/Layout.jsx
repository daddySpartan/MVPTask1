import React, { Component } from 'react';
import { Container } from 'reactstrap';
import NavBarMVPTask from './NavBarMVPTask';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <NavBarMVPTask />
        <Container className = 'main-container'>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
