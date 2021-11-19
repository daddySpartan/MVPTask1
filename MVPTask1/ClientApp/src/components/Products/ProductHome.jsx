import React, { Component } from 'react';
import axios from "axios";
import { Button, Loader, Table } from 'semantic-ui-react';
import ProductData from './ProductData';
import PageChange from '../Tables/PageChange';
import SelectDisplayRows from '../Tables/SelectDisplayRows';
import _ from 'lodash'

export default class ProductHome extends Component {
  
    constructor(props) {
        super(props);
        this.state = { 
            product: [],
            prodData: [],
            sd: [],           
            open: false,
            option: 1,
            keyid: 0,
            pdata1: null,
            pdata2: 0,
            begin: 0,
            end: 3,
            numOfRows: 3,
            activePage: 1,
            column: null,
            direction: null,
     
        };
    }

    componentDidMount() {this.fetchProduct();}  

    fetchProduct = () => {
      axios.get("Products/GetProduct")
      .then( ({data}) => {
        console.log(data);
        console.log(this.state.begin);
        console.log(this.state.end);
        this.setState((state) => {
            return {product: data,
                    sd: data,
                    prodData: data.slice(state.begin,state.end)}                     
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
            return {prodData: state.sd.slice(state.begin, state.end)}
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
            return {prodData: state.sd.slice(state.begin, state.end)}
        })
    }

    handleRowSelect = (setNumOfRows) => {
        this.setState((state) => { return {numOfRows: setNumOfRows, activePage: 1} })
        this.changePage(0,setNumOfRows,1)
    
    }
   

    openProductModal = (value1,value2,value3,value4,value5) => 
    { this.setState({ open: value1, option: value2, keyid: value3, pdata1: value4, pdata2: value5})}
    
  render() {

    const { product, prodData, open, option, keyid, pdata1, pdata2, numOfRows, activePage, column, direction } = this.state;
    if (product) 
    {
        return (
    
        <>
          <Button color='blue' onClick = { () => this.openProductModal(true,1)}>New Product</Button>
          <ProductData option = {option} open = {open} openProducttModal = {this.openProductModal} fetchProduct = {this.fetchProduct} pId = "" pdata1 = "" pdata2 = ""/>
          <Table sortable celled >
                <Table.Header >
                    <Table.Row>
                        <Table.HeaderCell
                            sorted={column === 'pname' ? direction : null}
                            onClick = {() => this.sortData('pname', 'CHANGE_SORT')}>
                             Name
                        </Table.HeaderCell>
                
                        <Table.HeaderCell
                            sorted={column === 'price' ? direction : null}
                            onClick = {() => this.sortData('price','CHANGE_SORT')}>
                            Address
                        </Table.HeaderCell>
                
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

            <Table.Body>

                {prodData.map((p) => {
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

            <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan="4">
                    <SelectDisplayRows handleRowSelect={this.handleRowSelect}/>
                    <PageChange data={product} changePage={this.changePage} changeRows={numOfRows} activePage={activePage}/>
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