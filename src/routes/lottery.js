import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import LotteryPage from '@/pages/Lottery';
import NotFound from '@/pages/NotFound';

const LotteryRouter = () => {
  const { url } = useRouteMatch();
  return (
    <Switch>
      <Route path={url} component={LotteryPage} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default LotteryRouter;
