import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Alert } from '@mui/material';
import './FirstPage.css';

function FirstPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = () => {
    if (name && phone && email) {
      localStorage.setItem('userDetails', JSON.stringify({ name, phone, email }));
      navigate('/second');
    } else {
      setErrorMessage('Please fill all fields');
    }
  };

  return (
    <div className='formContainer'>
      <h1 >Login Details</h1>
        <div className='formWrapper'>
          <form onSubmit={handleSubmit} className='form'>
          <TextField label="Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
          <TextField label="Phone" variant="outlined" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <TextField label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Button type="submit" variant="contained">Submit</Button>
          </form>
        </div>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
    </div>
  );
}

export default FirstPage;