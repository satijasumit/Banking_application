import React, { useState } from 'react'
import './Style.css'
import Modal from './Modal';

export const Auto = () => {

  const [showModal, setShowModal] = useState(false);
  const [address, setAddress] = useState({
    houseName: '',
    subBuilding: '',
    flatNumber: '',
    streetName: '',
    secondaryStreet: '',
    city: '',
    postalCode: ''
  });
  const [modalHeading, setModalHeading] = useState('');
  const [addressString, setAddressString] = useState('');
  const [error, setError] = useState('');

  const openModal = () => {
    const heading = addressString ? "Change address" : "Enter address manually";
    setModalHeading(heading);
    
    const [houseName = '', subBuilding = '', flatNumber = '', streetName = '', secondaryStreet = '', city = '', postalCode = ''] = addressString.split(',').map(part => part.trim());

    setAddress({ houseName, subBuilding, flatNumber, streetName, secondaryStreet, city, postalCode });

    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);

  const handleAddressChange = (event) => {
    setAddressString(event.target.value);
    setError('')
  };

  const updateAddress = (newAddress) => {
    setAddress(newAddress);
    const newAddressString = `${newAddress.houseName}, ${newAddress.subBuilding}, ${newAddress.flatNumber}, ${newAddress.streetName}, ${newAddress.secondaryStreet}, ${newAddress.city}, ${newAddress.postalCode}`;
    setAddressString(newAddressString);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!addressString.trim()) {
      setError('Address field cannot be empty');
      return;
    }
    setError('');

    try {
      // Assuming you have an API endpoint to send the address to the backend
      const response = await fetch('http://localhost:8050/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address: address }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit address');
      }
    }

    catch (error) {
      console.error('Error submitting address:', error);
    }

  };

  return (
    <div>
    <div className='addrbox'>
        <h2>Home Address</h2>
        <div className='text'>Please provide your current address</div>

        <div className='inputs'>

          <h5>SEARCH YOUR ADDRESS</h5>
          <div className='input1'>
          <input
              type='textarea'
              id='addr'
              name='address'
              placeholder="Enter your address or pincode"
              value={addressString}
              onChange={handleAddressChange}
              className={addressString ? 'hasaddress' : ''}
            />
          </div>
          {error && <div className="error">{error}</div>}
          <div className='popup'>
            <a className="popup-link" onClick={openModal}>
            {addressString ? "Change address >" : "Prefer to enter address manually >"} 
            </a>
          </div>

          <h5>HOW LONG HAVE U LIVED AT THE ADDRESS</h5>

          <form onSubmit={handleSubmit}>
            <input type="submit" value="Submit" />
          </form>
        </div>
    </div>
    <Modal show={showModal} handleClose={closeModal} heading={modalHeading} address={address} updateAddress={updateAddress}/>
    </div>
  )
}