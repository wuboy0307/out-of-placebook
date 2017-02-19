import React from 'react';
import { Provider } from 'react-redux';
// react router
import { Router, Route, IndexRoute,
  hashHistory, IndexRedirect } from 'react-router';

// react components
import App from './app';
import Home from './home/home';
import SignUpForm from './signup_form/signup_form';

const Root = ({ store }) => {

  const _ensureLoggedIn = (nextState, replace) => {
    const currentUser = store.getState().auth.currentUser;
    if (!currentUser) {
      replace('/signup');
    }
  };

  const _redirectIfLoggedIn = (nextState, replace) => {
    const currentUser = store.getState().auth.currentUser;
    if (currentUser) {
      replace('/');
    }
  };

  return (
    <Provider store={store}>
      <Router history={hashHistory}
        onUpdate={ () => window.scrollTo(0,0)}>

        <Route path="/" component={App} onEnter={_ensureLoggedIn} >
          <IndexRedirect to="/profile/15" />
          <Route path="/profile/:profileId" component={Home} />
        </Route>
        
        <Route path="/signup" component={SignUpForm}
          onEnter={_redirectIfLoggedIn} />

      </Router>
    </Provider>
  );
};

export default Root;
