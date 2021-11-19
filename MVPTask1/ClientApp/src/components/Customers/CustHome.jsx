import React, { Component } from 'react';
import axios from "axios";
import { Button, Loader, Table} from 'semantic-ui-react';
import CustData from './CustData';
import PageChange from '../Tables/PageChange';
import SelectDisplayRows from '../Tables/SelectDisplayRows';
import _ from 'lodash'


export default class CustHome extends Component {
  
    constructor(props) {
        super(props);
        this.state = { 
            cust: [],
            custData: [],
            sd: [],
            open: false,
            option: 1,
            keyid: 0,
            cdata1: null,
            cdata2: null,
            begin: 0,
            end: 3,
            numOfRows: 3,
            activePage: 1,
            column: null,
            direction: null,

        };
    }

    componentDidMount() {
        this.fetchCust();
    }  

    fetchCust = () => {
      axios.get("Customers/GetCustomer")
      .then ( ({data}) => {
        console.log(data);
        console.log(this.state.begin);
        console.log(this.state.end);
        this.setState((state) => {
            return {cust: data,
                    sd: data,
                    custData: data.slice(state.begin,state.end)}                     
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
            return {custData: state.sd.slice(state.begin, state.end)}
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
            return {custData: state.sd.slice(state.begin, state.end)}
        })
    }

    handleRowSelect = (setNumOfRows) => {
        this.setState((state) => { return {numOfRows: setNumOfRows, activePage: 1} })
        this.changePage(0,setNumOfRows,1)
    
    }
 
    openCustModal = (value1,value2,value3,value4,value5) => 
    { this.setState({ open: value1, option: value2, keyid: value3, cdata1: value4, cdata2: value5})}
    
  render() {

    const { cust, custData, open, option, keyid, cdata1, cdata2, numOfRows, activePage, column, direction} = this.state;
    
    if (cust) 
    {
        return (
          <>
            <Button color="blue" onClick={() => this.openCustModal(true, 1)}>
              New Customer
            </Button>
            <CustData
              option={option}
              open={open}
              openCustModal={this.openCustModal}
              fetchCust={this.fetchCust}
              cId=""
              cdata1=""
              cdata2=""
            />
            <Table sortable celled >
                <Table.Header >
                    <Table.Row>
                        <Table.HeaderCell
                            sorted={column === 'cname' ? direction : null}
                            onClick = {() => this.sortData('cname', 'CHANGE_SORT')}>
                             Name
                        </Table.HeaderCell>
                
                        <Table.HeaderCell
                            sorted={column === 'caddress' ? direction : null}
                            onClick = {() => this.sortData('caddress','CHANGE_SORT')}>
                            Address
                        </Table.HeaderCell>
                
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {custData.map((c) => {
                        return (
                        <Table.Row key={c.id}>
                            <Table.Cell>{c.cname ? c.cname : "undefine"}</Table.Cell>
                            <Table.Cell>{c.caddress ? c.caddress : "undefine"}</Table.Cell>
                            <Table.Cell>
                                <Button
                                    color="yellow"
                                    onClick={() => this.openCustModal(
                                        true,
                                        2,
                                        c.id,
                                        c.cname,
                                        c.caddress
                                    )}>
                                Edit
                                </Button>
                        <CustData
                          option={option}
                          open={open}
                          openCustModal={this.openCustModal}
                          fetchCust={this.fetchCust}
                          cId={keyid}
                          cdata1={cdata1}
                          cdata2={cdata2}
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <Button
                          color="red"
                          onClick={() =>
                            this.openCustModal(
                              true,
                              3,
                              c.id,
                              c.cname,
                              c.caddress
                            )
                          }
                        >
                          Delete
                        </Button>
                        <CustData
                          option={option}
                          open={open}
                          openCustModal={this.openCustModal}
                          fetchCust={this.fetchCust}
                          cId={keyid}
                          cdata1={cdata1}
                          cdata2={cdata2}
                        />
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan="4">
                    <SelectDisplayRows handleRowSelect={this.handleRowSelect}/>
                    <PageChange data={cust} changePage={this.changePage} changeRows={numOfRows} activePage={activePage}/>
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