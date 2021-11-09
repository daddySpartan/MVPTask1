import React, {useState, useEffect} from "react";
import { Button, Header, Form, Modal } from "semantic-ui-react";
import axios from "axios";

function CustEdit(props) {
  //const [open, setOpen] = React.useState(false)
  const {  open, openEditModal, cId, cdata} = props;
  
  const [cid, setCID] = useState(cId);
  const [cname, setCname] = useState(cdata.cname);
  const [caddress, setCaddress] = useState(cdata.caddress);

  {/*useEffect(() => {
      axios.get("/Customers/GetCustomer/"+cid)
      .then ( (data) => {
        console.log(data);
        this.setState ({cname: cname, caddress: caddress});
      })
      return () => {
          refresh()
      }
  })
  useEffect(() => {
    setCID({id})
    setCname({name});
    setCaddress({address})
    
}, []); */}
  const editCust = (ID) => { 
    axios
        .put("/Customers/PutCustomer/" + ID, { id: cdata.id, cname: cdata.cname, caddress: cdata.caddress})
        .then ( (res) => {
            openEditModal(false);
            setCname("");
            setCaddress("");           
            console.log(res);})
        .catch( (err) => {
                console.log(err)
                console.log(ID)
                console.log(cdata)
            });
    
            }


  return (
    <Modal open={open}>
      <Modal.Header>Update Customer</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Field>
              <label>Name</label>
              <input 
                placeholder={cname}
           
                onChange = { (e)  => setCname(e.target.value)}/>
            </Form.Field>
            <Form.Field>
              <label>Address</label>
              <input 
              placeholder={caddress}
              onChange = { (e)  => setCaddress(e.target.value)}/>
             
            </Form.Field>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick = {() => openEditModal(false)}>
          Cancel
        </Button>
        <Button color="green" onClick = {() => editCust(cid)}>
          Update
        </Button>       
      </Modal.Actions>
    </Modal>
  );
}

export default CustEdit;
