import React from 'react';
import 'typeface-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'mobx-react';
import BasicRoute from './route';
import rootStore from './store';

function App() {
  return (
    <>
      <div style={{ width: '100%' }}>
        <CssBaseline />
        <Provider rootStore={rootStore}>
          {/*<Table />*/}
          <BasicRoute />
        </Provider>
      </div>
    </>
  );
}

export default App;
