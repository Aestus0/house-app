import React from 'react';
import { inject, observer } from 'mobx-react';
import Table from '../../components/HouseTable';
import Map from '../../components/Map';

export default inject('rootStore')(observer((prop) => {
  const { UserStore } = prop.rootStore;
  if (!UserStore.user.userId) {
    UserStore.getUser();
  }
  return (
    <>
      <Table />
      <Map />
    </>
  );
}));
