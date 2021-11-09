import React from 'react';
import { Icon, Button, Menu, Table } from 'semantic-ui-react';
import axios from "axios";
//import CustEdit from './CustEdit';

const CustTable = (props) => {

    const {cust,refresh} = props;
    
    const deleteCust = (ID) => {
        axios.delete("Customers/DeleteCustomer/" + ID)
        .then ( (res) => {
            refresh();
            })
            .catch( (err) => {
                console.log(err);}); }
                
  
    
                fetchCustId = (ID) => {
                    axios.get("Customers/GetCustomer/" + ID)
                    .then( ({data}) => {
                      console.log(data);
                      this.setState ({custid: data,});
                    })
                    .catch( (err) => {
                      console.log(err);
                    }); 
                }
                          
       
   return(
        <Table celled>
            <Table.Header>
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
                            <Table.Cell><Button color='yellow' onClick = { () => this.openCustModal(true)}>Edit</Button>
                            <CustEdit  fetchCustId = {this.fetchCustId(c.id)} /></Table.Cell>
                            <Table.Cell><Button color='red' onClick = { () => deleteCust(c.id)} >Delete</Button></Table.Cell>
                        </Table.Row>
                    );
                })}
            </Table.Body>

            <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan='4'>
                        <Menu floated='right' pagination>
                            <Menu.Item as='a' icon>
                                <Icon name='chevron left' />
                            </Menu.Item>
                            <Menu.Item as='a'>1</Menu.Item>
                            <Menu.Item as='a'>2</Menu.Item>
                            <Menu.Item as='a'>3</Menu.Item>
                            <Menu.Item as='a'>4</Menu.Item>
                            <Menu.Item as='a' icon>
                                <Icon name='chevron right' />
                            </Menu.Item>
                        </Menu>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
    );
};

export default CustTable;