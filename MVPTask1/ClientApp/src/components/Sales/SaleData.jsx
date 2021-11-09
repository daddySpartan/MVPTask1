import React, {useState, useEffect } from "react";
import { Button, Form, Modal, Select } from "semantic-ui-react";
import axios from "axios";

function SaleData(props) {
  const { option, open, openSaleModal, fetchSale, slId, sldata1, sldata2, sldata3, sldata4} = props;

  const [salesDate, setSalesdate] = useState(sldata1);
  const [cid, setCid] = useState(sldata2);
  const [pid, setPid] = useState(sldata3);
  const [sid, setSid] = useState(sldata4);
 
  const [cList, setClist] = useState([]);
  const [pList, setPlist] = useState([]);
  const [sList, setSlist] = useState([]);

 
  useEffect( () => {
    axios.get("Customers/GetCustomer")
    .then( ({data}) => {
        const selectCust = data.map ( c => { return { key: c.id, value: c.id, text: c.cname}})
        setClist(selectCust);
    })
    .catch( (err) => {
      console.log(err);})

    axios.get("Products/GetProduct")
    .then( ({data}) => {   
        const selectProd = data.map ( p => { return { key: p.id, value: p.id, text: p.pname}})
        setPlist(selectProd);   
    })
    .catch( (err) => {
        console.log(err);})

    axios.get("Stores/GetStore")
     .then( ({data}) => {               
        const selectStore = data.map ( s => { return { key: s.id, value: s.id, text: s.sname}})
        setSlist(selectStore);            
    })
    .catch( (err) => {
        console.log(err);})
      
        
    },[])
 
  const createSale = () => { 
    axios
        .post("/Sales/PostSales", 
            {
                dateSold: salesDate,
                customerId: cid,
                productId: pid,
                storeId: sid })    

        .then ( (res) => {
            openSaleModal(false);
            fetchSale(); 
            console.log(res);})
            .catch( (err) => {
                console.log(err)
              });     
  }

  const editSale = (ID) => { 
         axios
         .put("/Sales/PutSales/" + ID, { id: slId, customerId: cid, productId: pid, storeId:sid, dateSold: salesDate})
         .then ( (res) => {
            openSaleModal(false);
            fetchSale();
            console.log(res);
            })
         .catch( (err) => {
            console.log(err)
            });
    }
  
  const deleteSale = (ID) => {
      axios.delete("Sales/DeleteSales/" + ID)
      .then ( (res) => {
        openSaleModal(false);
        fetchSale();
        console.log(res);
        })
        .catch( (err) => {
            console.log(err);}); 
    }

 
  const handleSelect1 = (data) => {
        setCid(data);
        console.log(data);
      };
  const handleSelect2 = (data) => {
        setPid(data);
        console.log(data);
      };
  const handleSelect3 = (data) => {
        setSid(data);
        console.log(data);
      };



  if (option === 2) {         
  return (
        <Modal open={open}>
        <Modal.Header>Update Sale</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form>
            <Form.Field>
                <label>Date Sold</label>
                <input 
                placeholder={sldata1} 
                onChange = { (e)  => setSalesdate(e.target.value)}/>              
              </Form.Field>
             <Form.Field>
                <label>Customer Name</label>
                <Select placeholder={sldata2} options={cList} onChange={(e, data) => handleSelect1(data.value)}/>                  
              </Form.Field>
              <Form.Field>
                <label>Product Name</label>
                <Select placeholder={sldata3} options={pList} onChange={(e, data) => handleSelect2(data.value)}/>                  
              </Form.Field>
              <Form.Field>
                <label>Store Name</label>
                <Select placeholder={sldata4} options={sList} onChange={(e, data) => handleSelect3(data.value)}/>                  
              </Form.Field>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick = {() => openSaleModal(false)}>
            Cancel
          </Button>
          <Button color="green" onClick = {() => editSale(slId)}>
            Update
          </Button>       
        </Modal.Actions>
      </Modal>
      )}
   
   else if (option === 1){
       return(
        <Modal open={open}>
        <Modal.Header>New Sale</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form>
            <Form.Field>
                <label>Date Sold</label>
                <input 
                placeholder='Please enter date sold (MM-dd-yyyy)' 
                onChange = { (e)  => setSalesdate(e.target.value)}/>              
              </Form.Field>
             <Form.Field>
                <label>Customer Name</label>
                <Select placeholder='Select customer' options={cList} onChange= {(e, data) => handleSelect1(data.value)} />                  
              </Form.Field>
              <Form.Field>
                <label>Product Name</label>
                <Select placeholder='Select product' options={pList} onChange= {(e, data) => handleSelect2(data.value)}/>                  
              </Form.Field>
              <Form.Field>
                <label>Store Name</label>
                <Select placeholder='Select store' options={sList} onChange= {(e, data) => handleSelect3(data.value)}/>                  
              </Form.Field>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick = {() => openSaleModal(false)}>
            Cancel
          </Button>
          <Button color="green" onClick = {createSale}>
            Create
          </Button>       
        </Modal.Actions>
      </Modal>     
    )}
    else{
      return(      
      <Modal
        size='mini'
        open={open}
      >
        <Modal.Header>Delete Sale</Modal.Header>
        <Modal.Content>
          <p>Are you sure?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => openSaleModal(false)}>
            No
          </Button>
          <Button positive onClick={() => deleteSale(slId)}>
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
      )
    }
}

export default SaleData;
