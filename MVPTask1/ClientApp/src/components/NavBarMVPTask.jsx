import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import './NavMenu.css'

export default class MenuExampleSecondary extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu secondary className='navbar'>
        <Menu.Item 
          as={NavLink} to="/"
          icon="home"
          name='home'
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
        />
        <Menu.Item 
          as={NavLink} to="/customer"
          icon="address book"
          name='Customers'
          active={activeItem === 'customer'}
          onClick={this.handleItemClick}
        />
        <Menu.Item 
          as={NavLink} to="/store"
          icon="address book"
          name='Stores'
          active={activeItem === 'store'}
          onClick={this.handleItemClick}
        />
        <Menu.Item 
          as={NavLink} to="/product"
          icon="boxes"
          name='Products'
          active={activeItem === 'product'}
          onClick={this.handleItemClick}
        />
        <Menu.Item 
          as={NavLink} to="/sale"
          icon="dollar sign"
          name='Sales'
          active={activeItem === 'sale'}
          onClick={this.handleItemClick}
        />
      </Menu>
    )
  }
}