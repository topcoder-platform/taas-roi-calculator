import React, { useLayoutEffect } from 'react';
import { DevTools } from 'topcoder-react-utils';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import Header from './components/Header';
import Footer from './components/Footer';
import store from './store';
import actions from './actions';

const App = () => {
  useLayoutEffect(() => {
    store.dispatch(actions.app.initApp());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes />
        <Footer />
        {process.env.NODE_ENV === 'development' && <DevTools />}
      </BrowserRouter>
    </Provider>
  );
};

export default App;
