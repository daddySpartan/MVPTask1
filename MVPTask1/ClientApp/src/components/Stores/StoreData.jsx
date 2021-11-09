import React, {useState} from "react";
import { Button, Form, Modal } from "semantic-ui-react";
import axios from "axios";

function StoreData(props) {
  const { option, open, openStoreModal, fetchStore, stId, stdata1, stdata2} = props;

  const [sname, setSname] = useState(stdata1);
  const [saddress, setSaddress] = useState(stdata2);

  const createStore = () => { 
    axios
        .post("/Stores/PostStore", 
            {
                sname: sname,
                saddress: saddress })    

        .then ( (res) => {
            openStoreModal(false);
            setSname("");
            setSaddress("");
            fetchStore(); 
            console.log(res);
        })

            .catch( (err) => {
                console.log(err)
              });     
  }

  const editStore = (ID) => { 
         axios
         .put("/Stores/PutStore/" + ID, { id: stId, sname: sname, saddress: saddress})
         .then ( (res) => {
            openStoreModal(false);
            setSname("");
            setSaddress("");           
            fetchStore();
            console.log(res);
            })
         .catch( (err) => {
            console.log(err)
            });
    }
  
  const deleteStore = (ID) => {
      axios.delete("Stores/DeleteStore/" + ID)
      .then ( (res) => {
        openStoreModal(false);
        fetchStore();
        console.log(res);
        })
        .catch( (err) => {
            console.log(err);}); 
    }
  


  if (option === 2) {         
  return (
        <Modal open={open}>
        <Modal.Header>Update Store</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form>
              <Form.Field>
                <label>Name</label>
                <input 
                  placeholder={stdata1}
             
                  onChange = { (e)  => setSname(e.target.value)}/>
              </Form.Field>
              <Form.Field>
                <label>Address</label>
                <input 
                placeholder={stdata2}
                onChange = { (e)  => setSaddress(e.target.value)}/>
               
              </Form.Field>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick = {() => openStoreModal(false)}>
            Cancel
          </Button>
          <Button color="green" onClick = {() => editStore(stId)}>
            Update
          </Button>       
        </Modal.Actions>
      </Modal>
      )}
   
   else if (option === 1){
       return(
        <Modal open={open}>
        <Modal.Header>New Store</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form>
              <Form.Field>
                <label>Name</label>
                <input 
                  placeholder="Please enter store name"
                  onChange = { (e)  => setSname(e.target.value)}/>
              </Form.Field>
              <Form.Field>
                <label>Address</label>
                <input 
                placeholder="Please enter store address" 
                onChange = { (e)  => setSaddress(e.target.value)}/>
               
              </Form.Field>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick = {() => openStoreModal(false)}>
            Cancel
          </Button>
          <Button color="green" onClick = {createStore}>
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
        <Modal.Header>Delete Store</Modal.Header>
        <Modal.Content>
          <p>Are you sure?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => openStoreModal(false)}>
            No
          </Button>
          <Button positive onClick={() => deleteStore(stId)}>
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
      )
    }
}

export default StoreData;
