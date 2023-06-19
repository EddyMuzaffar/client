import React from 'react';
import './App.css';
import { Button, Divider, Icon, Input, InputAdornment, TextField } from '@mui/material';


import ViewCitation from './components/ViewCitation/ViewCitation';
import ManageCitation from './components/ManageCitation/ManageCitation';

function App() {
  return (

    <div className="App">
      <ViewCitation />

      <Divider color="#AAA9AB" variant="fullWidth" orientation="horizontal" style={
        { margin: '60px' }
      }></Divider>

      <ManageCitation></ManageCitation>
    </div>
  );
}

export default App;
