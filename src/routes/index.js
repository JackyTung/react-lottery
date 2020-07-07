import React, { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { Redirect, Route, Switch, BrowserRouter } from 'react-router-dom';

import { createBrowserHistory } from 'history';

import Progress from '@/components/Progress';
import configureStore from '@/redux/stores/configureStore';

const history = createBrowserHistory();

const LotteryRouter = lazy(() => import('./lottery'));

const store = configureStore();

const BaseRouter = () => {
  return (
    <Provider store={store}>
      <BrowserRouter history={history} basename={process.env.PUBLIC_URL}>
        <Suspense fallback={<Progress message="Loading..." />}>
          <Switch>
            <Route path="/lottery" component={LotteryRouter} />
            <Route path="/" render={() => <Redirect to="/lottery" />} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
};

export default BaseRouter;
