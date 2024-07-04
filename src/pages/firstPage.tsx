// src/firstPage.tsx

import React, { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FirstPage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Validate input
    if (!name || !phone || !email) {
      setErrorMessage('Please fill out all fields before proceeding.');
      return;
    }

    // Save to localStorage
    localStorage.setItem('userDetails', JSON.stringify({ name, phone, email }));
    console.log('Saved user details to localStorage',
      'name:', name,
      'phone:', phone,
      'email:', email);

    // Navigate to the second page
    navigate('/second');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        User Information
      </Typography>

      {errorMessage && (
        <Typography variant="body2" sx={{ color: 'red', mb: 2 }}>
          {errorMessage}
        </Typography>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          placeholder="Enter your name"
        />
        <TextField
          label="Phone Number"
          variant="outlined"
          fullWidth
          value={phone}
           onChange={(e) => {
            const input = e.target.value.replace(/\D/g, '');
            setPhone(input);
          }}
          margin="normal"
          placeholder="Enter your phone number"
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          type="email"
          placeholder="Enter your email address"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default FirstPage;
