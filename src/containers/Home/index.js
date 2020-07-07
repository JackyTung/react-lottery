import React from 'react';
import Loadable from 'react-loadable';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import NotFound from '@/components/NotFound';

const AsyncLottery = new Loadable({
  loader: () => import(/* webpackChunkName: "lottery" */ './Lottery'),
  loading: () => [],
});

const HomeIndex = () => {
  const { url } = useRouteMatch();
  return (
    <Switch>
      {<Route exact path={url} render={() => <Redirect to={'/home/lottery'} />} />}
      <Route path={`${url}/lottery`} component={AsyncLottery} />
      {<Route component={NotFound} />}
    </Switch>
  );
};

export default HomeIndex;
