import React, { Component } from 'react';
import axios from "axios";
import { Button, Loader, Table } from 'semantic-ui-react';
import CustData from './CustData';

export default class CustHome extends Component {
  
    constructor(props) {
        super(props);
        this.state = { 
            cust: null,
            open: false,
            option: 1,
            keyid: 0,
            cdata1: null,
            cdata2: null
      
        };
    }

    componentDidMount() {this.fetchCust();}  

    fetchCust = () => {
      axios.get("Customers/GetCustomer")
      .then( ({data}) => {
        console.log(data);
        this.setState ({cust: data,});
      })
      .catch( (err) => {
        console.log(err);
      }); 
    }

 
    openCustModal = (value1,value2,value3,value4,value5) => 
    { this.setState({ open: value1, option: value2, keyid: value3, cdata1: value4, cdata2: value5})}
    
  render() {

    const { cust, open, option, keyid, cdata1, cdata2 } = this.state;
    if (cust) 
    {
        return (
    
        <div>
          <Button color='blue' onClick = { () => this.openCustModal(true,1)}>New Customer</Button>
          <CustData option = {option} open = {open} openCustModal = {this.openCustModal} fetchCust = {this.fetchCust} cId = "" cdata1 = "" cdata2 = ""/>
          <Table celled>
            <Table.Header className='customerheader'>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Address</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>

                {cust.map((c) => {
                    return (
                        
                        <Table.Row key={c.id}>
                            <Table.Cell>{c.cname ? c.cname : "undefine"}</Table.Cell>
                            <Table.Cell>{c.caddress ? c.caddress : "undefine"}</Table.Cell>
                            <Table.Cell><Button color='yellow' onClick = { () => this.openCustModal(true,2,c.id,c.cname,c.caddress)}>Edit</Button>
                            <CustData  option = {option} open = {open} openCustModal = {this.openCustModal} fetchCust = {this.fetchCust} 
                                cId = {keyid} cdata1 = {cdata1} cdata2 = {cdata2}/></Table.Cell>
                            <Table.Cell><Button color='red' onClick = { () => this.openCustModal(true,3,c.id,c.cname,c.caddress)}>Delete</Button> 
                            <CustData  option = {option} open = {open} openCustModal = {this.openCustModal} fetchCust = {this.fetchCust} 
                                cId = {keyid} cdata1 = {cdata1} cdata2 = {cdata2}/></Table.Cell>                         
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