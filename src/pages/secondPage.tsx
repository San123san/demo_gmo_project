// src/pages/secondPage.tsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Container, Typography } from '@mui/material';
import DepartmentList from './departmentList.tsx';

// Define TypeScript interfaces
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface UserDetails {
  name: string;
  phone: string;
  email: string;
}

const SecondPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch data when component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs only once, on mount

  // Fetch userDetails from localStorage
  const userDetails: UserDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');

  // Define columns for the DataGrid
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Title', width: 500 },
    { field: 'body', headerName: 'Body', width: 1450 },
  ];

  return (
    <Box sx={{ height: 'full', width: 'full', display: 'flex', flexDirection: 'column', justifyItems: 'center', alignItems: 'center',
      paddingTop: 3
    }}>
      <Typography variant="h2">Welcome, {userDetails.name}!</Typography>
      <Typography variant="body1">Phone Number: {userDetails.phone}</Typography>
      <Typography variant="body1">Email: {userDetails.email}</Typography>

      {/* Display DataGrid with fetched posts */}
      {loading ? (
        <Typography variant="body1">Loading...</Typography>
      ) : (
        <Box sx={{ height: 400, width: '200vh', paddingLeft: 1, padding: 2}}>
          <Box sx={{ height: 400,  }}>
          <DataGrid
            rows={posts}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          /></Box>
        </Box>
      )}

      <Container style={{ display:'flex', justifyContent: 'center', width: '100%'}}>
        <DepartmentList />
      </Container>
      

      <Box sx={{ marginTop: 3, marginBottom: 3 }}>
        <Link to="/">Back to First Page</Link>
      </Box>
      
    </Box>
  );
};

export default SecondPage;
