import React, {useState} from "react";
import { Button, Form, Modal } from "semantic-ui-react";
import axios from "axios";

function CustData(props) {
  const { option, open, openCustModal, fetchCust, cId, cdata1, cdata2} = props;

  //const [cid, setCID] = useState(cId);
  const [cname, setCname] = useState(cdata1);
  const [caddress, setCaddress] = useState(cdata2);

  const createCust = () => { 
    axios
        .post("/Customers/PostCustomer", 
            {
                cname: cname,
                caddress: caddress })    

        .then ( (res) => {
            openCustModal(false);
            setCname("");
            setCaddress("");
            fetchCust(); 
            console.log(res);
          })

            .catch( (err) => {
                console.log(err)
              });     
  }

  const editCust = (ID) => { 
         axios
         .put("/Customers/PutCustomer/" + ID, { id: cId, cname: cname, caddress: caddress})
         .then ( (res) => {
            openCustModal(false);
            setCname("");
            setCaddress("");           
            fetchCust();
            console.log(res);
            })
         .catch( (err) => {
            console.log(err)
            console.log(ID)
            });
    }
  
  const deleteCust = (ID) => {
      axios.delete("Customers/DeleteCustomer/" + ID)
      .then ( (res) => {
        openCustModal(false);
        fetchCust();
        console.log(res);
        })
        .catch( (err) => {
            console.log(err);}); 
    }
  


  if (option === 2) {         
  return (
        <Modal open={open}>
        <Modal.Header>Update Customer</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form>
              <Form.Field>
                <label>Name</label>
                <input 
                  placeholder={cdata1}
             
                  onChange = { (e)  => setCname(e.target.value)}/>
              </Form.Field>
              <Form.Field>
                <label>Address</label>
                <input 
                placeholder={cdata2}
                onChange = { (e)  => setCaddress(e.target.value)}/>
               
              </Form.Field>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick = {() => openCustModal(false)}>
            Cancel
          </Button>
          <Button color="green" onClick = {() => editCust(cId)}>
            Update
          </Button>       
        </Modal.Actions>
      </Modal>
      )}
   
   else if (option === 1){
       return(
        <Modal open={open}>
        <Modal.Header>New Customer</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form>
              <Form.Field>
                <label>Name</label>
                <input 
                  placeholder="Please enter your name"
                  onChange = { (e)  => setCname(e.target.value)}/>
              </Form.Field>
              <Form.Field>
                <label>Address</label>
                <input 
                placeholder="Please enter your address" 
                onChange = { (e)  => setCaddress(e.target.value)}/>
               
              </Form.Field>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick = {() => openCustModal(false)}>
            Cancel
          </Button>
          <Button color="green" onClick = {createCust}>
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
        <Modal.Header>Delete Customer</Modal.Header>
        <Modal.Content>
          <p>Are you sure?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => openCustModal(false)}>
            No
          </Button>
          <Button positive onClick={() => deleteCust(cId)}>
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
      )
    }
}

export default CustData;
