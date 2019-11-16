import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import LoadingComponent from '../components/LoadingComponent';

const LoadableMap = Loadable({
  loader: () => import('../page/map'),
  loading: LoadingComponent,
});

const LoadableLogin = Loadable({
  loader: () => import('../page/login'),
    loading: LoadingComponent,
});

const BasicRoute = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/login" component={LoadableLogin}/>
      <Route exact path="/" component={LoadableMap} />
      {/*<Route exact path="/detail" component={Detail} />*/}
    </Switch>
  </HashRouter>
);


export default BasicRoute;
