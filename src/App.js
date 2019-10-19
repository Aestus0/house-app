import React from 'react';
import { Map } from 'react-amap';
import CssBaseline from '@material-ui/core/CssBaseline';


function App() {
  return (
    <>
      <div style={{ width: '100%', height: 500 }}>
        <CssBaseline />
        <Map amapkey="35412c4cea7061933cad3b26eef171db" />
      </div>
    </>
  );
}

export default App;
