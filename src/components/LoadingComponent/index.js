import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

const MyLoadingComponent = ({ isLoading, error }) => {
  // Handle the loading state
  if (isLoading) {
    return (<LinearProgress />);
  }
  // Handle the error state
  if (error) {
    return <div>Sorry, there was a problem loading the page.</div>;
  }
  return null;
};


export default MyLoadingComponent;
