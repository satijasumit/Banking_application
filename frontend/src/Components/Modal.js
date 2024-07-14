import React, {useState, useEffect} from 'react';
import './Modal.css'; // Assuming you have a separate CSS file for modal styles

const Modal = ({ show, handleClose, heading, address, updateAddress}) => {

  const [modalAddress, setModalAddress] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setModalAddress(address);
  }, [address]);

  const handleModalAddressChange = (event) => {
    setModalAddress({ ...modalAddress, [event.target.name]: event.target.value });
    setError('')
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.values(modalAddress).some(field => !field.trim())) {
      setError('Address field cannot be empty');
      return;
    }
    setError('');
    updateAddress(modalAddress);
    handleClose();
  };

  return (
    <div className={`modal ${show ? 'display-block' : 'display-none'}`}>
      <div className="modal-content">
        
        <form>
        <h2>{heading}</h2>
          <label className="input-label">HOUSE OR BUILDING NAME</label>
          <input type="text" name="houseName" className="input" placeholder="Enter house or building name" value={modalAddress.houseName} onChange={handleModalAddressChange} />

          <label className="input-label">SUB BUILDING</label>
          <input type="text" name="subBuilding" className="input" placeholder="Enter sub building" value={modalAddress.subBuilding} onChange={handleModalAddressChange} />

          <label className="input-label">FLAT OR BUILDING NO.</label>
          <input type="number" name="flatNumber" className="input" placeholder="Enter flat number" value={modalAddress.flatNumber} onChange={handleModalAddressChange} />

          <label className="input-label">STREET NAME</label>
          <input type="text" name="streetName" className="input" placeholder="Enter street name" value={modalAddress.streetName} onChange={handleModalAddressChange} />

          <label className="input-label">SECONDARY STREET</label>
          <input type="text" name="secondaryStreet" className="input" placeholder="Enter secondary street" value={modalAddress.secondaryStreet} onChange={handleModalAddressChange} />

          <label className="input-label">TOWN OR CITY</label>
          <input type="text" name="city" className="input" placeholder="Enter town or city" value={modalAddress.city} onChange={handleModalAddressChange} />

          <label className="input-label">POSTAL CODE</label>
          <input type="text" name="postalCode" className="input" placeholder="Enter postal code" value={modalAddress.postalCode} onChange={handleModalAddressChange} />

          {error && <div className="error">{error}</div>}
          <input type="submit" value="Save" onClick={handleSubmit}/>
        </form>
      </div>
    </div>
  );
};

export default Modal;
