import React, { Component } from 'react';
import axios from "axios";
import { Button, Loader, Table } from 'semantic-ui-react';
import SaleData from './SaleData';
import { format } from "date-fns";


export default class SaleHome extends Component {
  
    constructor(props) {
        super(props);
        this.state = { 
            sale: null,
            open: false,
            option: 1,
            keyid: 0,
            sldata1: null,
            sldata2: null,
            sldata3: null,
            sldata4: null
      
        };
    }

    componentDidMount() {this.fetchSale();}  

    fetchSale = () => {
      axios.get("Sales/GetSales")
      .then( ({data}) => {
        console.log(data);
        this.setState ({sale: data,});
      })
      .catch( (err) => {
        console.log(err);
      }); 
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

    const { sale, open, option, keyid, sldata1, sldata2, sldata3, sldata4 } = this.state;
    if (sale) 
    {
        return (
    
        <div>
          <Button color='blue' onClick = { () => this.openSaleModal(true,1)}>New Sale</Button>
          <SaleData option = {option} open = {open} openSaletModal = {this.openSaleModal} fetchSale = {this.fetchSale} 
          slId = "" sldata1 = "" sldata2 = "" sldata3 = "" sldata4 = ""/>
          <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Customer</Table.HeaderCell>
                    <Table.HeaderCell>Product</Table.HeaderCell>
                    <Table.HeaderCell>Store</Table.HeaderCell>
                    <Table.HeaderCell>Date Sold</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>

                {sale.map((sl) => {
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

        </Table>       
       </div>
        );
    }
    else
        { return <Loader/>; }
    
  };
  

}