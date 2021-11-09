import React, { Component } from 'react';
import axios from "axios";
import { Button, Loader, Table } from 'semantic-ui-react';
import ProductData from './ProductData';

export default class ProductHome extends Component {
  
    constructor(props) {
        super(props);
        this.state = { 
            product: null,
            open: false,
            option: 1,
            keyid: 0,
            pdata1: null,
            pdata2: 0
      
        };
    }

    componentDidMount() {this.fetchProduct();}  

    fetchProduct = () => {
      axios.get("Products/GetProduct")
      .then( ({data}) => {
        console.log(data);
        this.setState ({product: data,});
      })
      .catch( (err) => {
        console.log(err);
      }); 
    }

 
    openProductModal = (value1,value2,value3,value4,value5) => 
    { this.setState({ open: value1, option: value2, keyid: value3, pdata1: value4, pdata2: value5})}
    
  render() {

    const { product, open, option, keyid, pdata1, pdata2 } = this.state;
    if (product) 
    {
        return (
    
        <div>
          <Button color='blue' onClick = { () => this.openProductModal(true,1)}>New Product</Button>
          <ProductData option = {option} open = {open} openProducttModal = {this.openProductModal} fetchProduct = {this.fetchProduct} pId = "" pdata1 = "" pdata2 = ""/>
          <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Price</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>

                {product.map((p) => {
                    return (
                        
                        <Table.Row key={p.id}>
                            <Table.Cell>{p.pname ? p.pname : "undefine"}</Table.Cell>
                            <Table.Cell>{p.price ? "$"+p.price : "undefine"}</Table.Cell>
                            <Table.Cell><Button color='yellow' onClick = { () => this.openProductModal(true,2,p.id,p.pname,p.price)}>Edit</Button>
                            <ProductData  option = {option} open = {open} openProductModal = {this.openProductModal} fetchProduct = {this.fetchProduct} 
                                pId = {keyid} pdata1 = {pdata1} pdata2 = {pdata2}/></Table.Cell>
                            <Table.Cell><Button color='red' onClick = { () => this.openProductModal(true,3,p.id,p.pname,p.price)}>Delete</Button> 
                            <ProductData  option = {option} open = {open} openProductModal = {this.openProductModal} fetchProduct = {this.fetchProduct} 
                                pId = {keyid} pdata1 = {pdata1} pdata2 = {pdata2}/></Table.Cell>                         
                        </Table.Row>
                    );
                })}
            </Table.Body>

        </Table>

       </div>
        );
    }
    else
        { return <Loader/>; }
    
  };
  

}