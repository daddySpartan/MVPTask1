import React, { Component } from 'react';
import axios from "axios";
import { Button, Loader, Table } from 'semantic-ui-react';
import StoreData from './StoreData';

export default class StoreHome extends Component {
  
    constructor(props) {
        super(props);
        this.state = { 
            store: null,
            open: false,
            option: 1,
            keyid: 0,
            stdata1: null,
            stdata2: null
      
        };
    }

    componentDidMount() {this.fetchStore();}  

    fetchStore = () => {
      axios.get("Stores/GetStore")
      .then( ({data}) => {
        console.log(data);
        this.setState ({store: data,});
      })
      .catch( (err) => {
        console.log(err);
      }); 
    }

 
    openStoreModal = (value1,value2,value3,value4,value5) => 
    { this.setState({ open: value1, option: value2, keyid: value3, stdata1: value4, stdata2: value5})}
    
  render() {

    const { store, open, option, keyid, stdata1, stdata2 } = this.state;
    if (store) 
    {
        return (
    
        <div>
          <Button color='blue' onClick = { () => this.openStoreModal(true,1)}>New Store</Button>
          <StoreData option = {option} open = {open} openStoretModal = {this.openStoreModal} fetchStore = {this.fetchStore} stId = "" stdata1 = "" stdata2 = ""/>
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

                {store.map((st) => {
                    return (
                        
                        <Table.Row key={st.id}>
                            <Table.Cell>{st.sname ? st.sname : "undefine"}</Table.Cell>
                            <Table.Cell>{st.saddress ? st.saddress : "undefine"}</Table.Cell>
                            <Table.Cell><Button color='yellow' onClick = { () => this.openStoreModal(true,2,st.id,st.sname,st.saddress)}>Edit</Button>
                            <StoreData  option = {option} open = {open} openStoreModal = {this.openStoreModal} fetchStore = {this.fetchStore} 
                                stId = {keyid} stdata1 = {stdata1} stdata2 = {stdata2}/></Table.Cell>
                            <Table.Cell><Button color='red' onClick = { () => this.openStoreModal(true,3,st.id,st.sname,st.saddress)}>Delete</Button> 
                            <StoreData  option = {option} open = {open} openStoreModal = {this.openStoreModal} fetchStore = {this.fetchStore} 
                                stId = {keyid} stdata1 = {stdata1} stdata2 = {stdata2}/></Table.Cell>                         
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