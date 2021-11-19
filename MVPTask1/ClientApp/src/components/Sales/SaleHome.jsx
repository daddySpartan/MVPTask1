import React, { Component } from 'react';
import axios from "axios";
import { Button, Loader, Table } from 'semantic-ui-react';
import SaleData from './SaleData';
import { format } from "date-fns";
import PageChange from '../Tables/PageChange';
import SelectDisplayRows from '../Tables/SelectDisplayRows';
import _ from 'lodash'


export default class SaleHome extends Component {
  
    constructor(props) {
        super(props);
        this.state = { 
            sale: [],
            saleData: [],
            sd: [],
            open: false,
            option: 1,
            keyid: 0,
            sldata1: null,
            sldata2: null,
            sldata3: null,
            sldata4: null,
            begin: 0,
            end: 3,
            numOfRows: 3,
            activePage: 1,
            column: null,
            direction: null,
     
        };
    }

    componentDidMount() {this.fetchSale();}  

    fetchSale = () => {
      axios.get("Sales/GetSales")
      .then( ({data}) => {
        console.log(data);
        console.log(this.state.begin);
        console.log(this.state.end);
        this.setState((state) => {
            return {sale: data,
                    sd: data,
                    saleData: data.slice(state.begin,state.end)}                     
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
            return {saleData: state.sd.slice(state.begin, state.end)}
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
            return {saleData: state.sd.slice(state.begin, state.end)}
        })
    }

    handleRowSelect = (setNumOfRows) => {
        this.setState((state) => { return {numOfRows: setNumOfRows, activePage: 1} })
        this.changePage(0,setNumOfRows,1)
    
    }

    formatDate = (_date) =>
    {
        var date = new Date(_date);
        var formattedDate = format(date, "MM-dd-yyyy");
        return(formattedDate)
            
    };
    
    openSaleModal = (value1,value2,value3,value4,value5,value6,value7) => 
    { this.setState({ open: value1, option: value2, keyid: value3, sldata1: value4, sldata2: value5, sldata3: value6, sldata4: value7})
    }
    
  render() {

    const { sale, saleData, open, option, keyid, sldata1, sldata2, sldata3, sldata4, numOfRows, activePage, column, direction } = this.state;
    if (sale) 
    {
        return (
    
        <>
          <Button color='blue' onClick = { () => this.openSaleModal(true,1)}>New Sale</Button>
          <SaleData option = {option} open = {open} openSaletModal = {this.openSaleModal} fetchSale = {this.fetchSale} 
          slId = "" sldata1 = "" sldata2 = "" sldata3 = "" sldata4 = ""/>
            <Table sortable celled >
                <Table.Header >
                    <Table.Row>
                        <Table.HeaderCell
                            sorted={column === 'customer.cname' ? direction : null}
                            onClick = {() => this.sortData('customer.cname', 'CHANGE_SORT')}>
                             Customer
                        </Table.HeaderCell>
                
                        <Table.HeaderCell
                            sorted={column === 'product.pname' ? direction : null}
                            onClick = {() => this.sortData('product.pname','CHANGE_SORT')}>
                            Product
                        </Table.HeaderCell>

                         <Table.HeaderCell
                            sorted={column === 'store.sname' ? direction : null}
                            onClick = {() => this.sortData('store.sname','CHANGE_SORT')}>
                            Store
                        </Table.HeaderCell>

                          <Table.HeaderCell
                            sorted={column === 'dateSold' ? direction : null}
                            onClick = {() => this.sortData('dateSold','CHANGE_SORT')}>
                            Date Sold
                        </Table.HeaderCell>
              
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

            <Table.Body>

                {saleData.map((sl) => {
                    return (
                        
                        <Table.Row key={sl.id}>
                            <Table.Cell>{sl.customer.cname ? sl.customer.cname : "undefine"}</Table.Cell>
                            <Table.Cell>{sl.product.pname ? sl.product.pname : "undefine"}</Table.Cell>
                            <Table.Cell>{sl.store.sname ? sl.store.sname : "undefine"}</Table.Cell>
                            <Table.Cell>{this.formatDate(sl.dateSold)}</Table.Cell>
                            <Table.Cell><Button color='yellow' onClick = { () => this.openSaleModal(true,2,sl.id,this.formatDate(sl.dateSold),sl.customer.cname,sl.product.pname,sl.store.sname)}>Edit</Button>
                            <SaleData  option = {option} open = {open} openSaleModal = {this.openSaleModal} fetchSale = {this.fetchSale} 
                                slId = {keyid} sldata1 = {sldata1} sldata2 = {sldata2} sldata3 = {sldata3} sldata4 = {sldata4}/></Table.Cell>
                            <Table.Cell><Button color='red' onClick = { () => this.openSaleModal(true,3,sl.id)}>Delete</Button> 
                            <SaleData  option = {option} open = {open} openSaleModal = {this.openSaleModal} fetchSale = {this.fetchSale} 
                                slId = {keyid} sldata1 = {sldata1} sldata2 = {sldata2} sldata3 = {sldata3} sldata4 = {sldata4}/></Table.Cell>                         
                        </Table.Row>
                    );
                })}
            </Table.Body>
            <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan="6">
                    <SelectDisplayRows handleRowSelect={this.handleRowSelect}/>
                    <PageChange data={sale} changePage={this.changePage} changeRows={numOfRows} activePage={activePage}/>
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