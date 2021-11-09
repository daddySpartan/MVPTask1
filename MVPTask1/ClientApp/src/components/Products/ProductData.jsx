import React, {useState} from "react";
import { Button, Form, Modal } from "semantic-ui-react";
import axios from "axios";

function ProductData(props) {
  const { option, open, openProductModal, fetchProduct, pId, pdata1, pdata2} = props;

  const [pname, setPname] = useState(pdata1);
  const [price, setPrice] = useState(pdata2);

  const createProduct = () => { 
    axios
        .post("/Products/PostProduct", 
            {
                pname: pname,
                price: price })    

        .then ( (res) => {
            openProductModal(false);
            setPname("");
            setPrice("");
            fetchProduct();
            console.log(res);
        })

            .catch( (err) => {
                console.log(err)
              });     
  }

  const editProduct = (ID) => { 
         axios
         .put("/Products/PutProduct/" + ID, { id: pId, pname: pname, price: price})
         .then ( (res) => {
            openProductModal(false);
            setPname("");
            setPrice("");           
            fetchProduct();
            console.log(res);
            })
         .catch( (err) => {
            console.log(err)
            console.log(ID)
            });
    }
  
  const deleteProduct = (ID) => {
      axios.delete("Products/DeleteProduct/" + ID)
      .then ( (res) => {
        openProductModal(false);
        fetchProduct();
        console.log(res);
        })
        .catch( (err) => {
            console.log(err);}); 
    }
  


  if (option === 2) {         
  return (
        <Modal open={open}>
        <Modal.Header>Update Product</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form>
              <Form.Field>
                <label>Name</label>
                <input 
                  placeholder={pdata1}
                  
                  onChange = { (e)  => setPname(e.target.value)}/>
              </Form.Field>
              <Form.Field>
                <label>Price</label>
                <input 
                placeholder={pdata2}
                
                onChange = { (e)  => setPrice(e.target.value)}/>              
              </Form.Field>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick = {() => openProductModal(false)}>
            Cancel
          </Button>
          <Button color="green" onClick = {() => editProduct(pId)}>
            Update
          </Button>       
        </Modal.Actions>
      </Modal>
      )}
   
   else if (option === 1){
       return(
        <Modal open={open}>
        <Modal.Header>New Product</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form>
              <Form.Field>
                <label>Name</label>
                <input 
                  placeholder="Please enter product name"
                  onChange = { (e)  => setPname(e.target.value)}/>
              </Form.Field>
              <Form.Field>
                <label>Price</label>
                <input 
                placeholder="Please enter product pricing" 
                onChange = { (e)  => setPrice(e.target.value)}/>
               
              </Form.Field>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick = {() => openProductModal(false)}>
            Cancel
          </Button>
          <Button color="green" onClick = {createProduct}>
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
        <Modal.Header>Delete Product</Modal.Header>
        <Modal.Content>
          <p>Are you sure?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => openProductModal(false)}>
            No
          </Button>
          <Button positive onClick={() => deleteProduct(pId)}>
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
      )
    }
}

export default ProductData;
