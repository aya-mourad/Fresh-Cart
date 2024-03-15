import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
export default function Brand({item}) {
  const [show, setShow] = useState(false);
const [selectedItem, setSelectedItem] = useState(null);

const handleShow = (item) => {
    setSelectedItem(item);
  setShow(true);
};

const handleClose = () => {
  setShow(false);
};
  return (
   
   <>
    <div key={item._id} className='col-md-3'>
    <div className="content">
      <div className={`boxtext product my-4`} onClick={() => handleShow(item)}>
        <img src={item.image} alt="" />
        <h6>{item.name}</h6>
      </div>
     
    </div>
  </div>
  <Modal show={show} onHide={handleClose }  backdrop={false}   className={`custommodal`}>
               <Modal.Header closeButton>
                 <Modal.Title>{selectedItem?.name}</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                 <div className="content d-flex justify-content-between flex-wrap">
                   <div className="content">
                     <h3 className='text-main'>{selectedItem?.name}</h3>
                     <p>{selectedItem?.slug}</p>
                   </div>
                   <img src={selectedItem?.image} alt="" />
                 </div>
               </Modal.Body>
               <Modal.Footer>
                 <Button variant="secondary" onClick={handleClose}>
                   Close
                 </Button>
               </Modal.Footer>
             </Modal>
  </>
  );
}