import React, { Component } from 'react';
import axios from "axios";
import { Button, Loader, Table } from 'semantic-ui-react';
import StoreData from './StoreData';
import PageChange from '../Tables/PageChange';
import SelectDisplayRows from '../Tables/SelectDisplayRows';
import _ from 'lodash'

export default class StoreHome extends Component {
  
    constructor(props) {
        super(props);
        this.state = { 
            store: [],
            storeData: [],
            sd: [],
            open: false,
            option: 1,
            keyid: 0,
            stdata1: null,
            stdata2: null,
            begin: 0,
            end: 3,
            numOfRows: 3,
            activePage: 1,
            column: null,
            direction: null,
      
        };
    }

    componentDidMount() {this.fetchStore();}  

    fetchStore = () => {
      axios.get("Stores/GetStore")
      .then( ({data}) => {
        console.log(data);
        console.log(this.state.begin);
        console.log(this.state.end);
        this.setState((state) => {
            return {store: data,
                    sd: data,
                    storeData: data.slice(state.begin,state.end)}                     
        });
      })
      .catch( (err) => {
        console.log(err);
      }); 
    }

    setSort = (setSortData,setDirection,setColumn) => {
        this.setState((state) => {
            return {sd: setSortData, direction: setDirection, column: setColumn}
        })
        this.setState((state) => {
            return {storeData: state.sd.slice(state.begin, state.end)}
        })
    }

    sortData = (col, action) => {          
        switch (action) {
          case 'CHANGE_SORT':
            if (this.state.column === col) {
                    var s = this.state.sd.slice().reverse();
                    var d = this.state.direction === 'ascending' ? 'descending' : 'ascending';              
                    this.setSort(s,d,col);
                    console.log(s);
                    console.log(d);                                                                         
                                                
            }
            else {
                    var s = _.sortBy(this.state.sd, [col]);
                    var d = 'ascending';
                    this.setSort(s,d,col); 
                    console.log(s);
                    console.log(d);                                                                         
            }  
        }
    }                

    changePage = (setBegin,setEnd,setActivePage) => { 
        this.setState((state) => { return {begin: setBegin, end: setEnd, activePage: setActivePage} })
        this.setState((state) => {
            return {storeData: state.sd.slice(state.begin, state.end)}
        })
    }

    handleRowSelect = (setNumOfRows) => {
        this.setState((state) => { return {numOfRows: setNumOfRows, activePage: 1} })
        this.changePage(0,setNumOfRows,1)
    
    }

    openStoreModal = (value1,value2,value3,value4,value5) => 
    { this.setState({ open: value1, option: value2, keyid: value3, stdata1: value4, stdata2: value5})}
    
  render() {

    const { store, storeData,  open, option, keyid, stdata1, stdata2, numOfRows, activePage, column, direction } = this.state;
    if (store) 
    {
        return (
    
        <>
          <Button color='blue' onClick = { () => this.openStoreModal(true,1)}>New Store</Button>
          <StoreData option = {option} open = {open} openStoretModal = {this.openStoreModal} fetchStore = {this.fetchStore} stId = "" stdata1 = "" stdata2 = ""/>
          <Table sortable celled >
                <Table.Header >
                    <Table.Row>
                        <Table.HeaderCell
                            sorted={column === 'sname' ? direction : null}
                            onClick = {() => this.sortData('sname', 'CHANGE_SORT')}>
                             Name
                        </Table.HeaderCell>
                
                        <Table.HeaderCell
                            sorted={column === 'saddress' ? direction : null}
                            onClick = {() => this.sortData('saddress','CHANGE_SORT')}>
                            Address
                        </Table.HeaderCell>
                
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

            <Table.Body>

                {storeData.map((st) => {
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
            <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan="4">
                    <SelectDisplayRows handleRowSelect={this.handleRowSelect}/>
                    <PageChange data={store} changePage={this.changePage} changeRows={numOfRows} activePage={activePage}/>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>

        </Table>

       </>
        );
    }
    else
        { return <Loader/>; }
    
  };
  

}