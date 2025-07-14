import React from 'react';
import axios from 'axios';

const AxiosTest = () => {
  const checkAxios = async () => {
    try {
      const res = await axios.get('https://reqres.in/api/users?page=1');
      console.log('Axios working-Fetched users:', res.data);
    } catch (err) {
      console.error('Axios failed:', err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={checkAxios}>Axios</button>
    </div>
  );
};

export default AxiosTest;
