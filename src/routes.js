import React from 'react';
import { browserHistory, IndexRoute, Route, Router } from 'react-router';

import {
  About,
  App,
  FAQ,
  GetApp,
  Grid,
  Home,
  IVP,
  NotFound,
  PrivacyPolicy,
  Search,
  TermsOfService,
  Welcome
} from 'containers';

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    const checkAuth = () => {
      const { profile } = store.getState();
      if (!profile) {
        // oops, not logged in, so can't be here!
        replace('/');
      }
      cb();
    };

    const loadAuth = () => {
      // Do nothing
    };

    if (!profile) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Router history={browserHistory}>
      <Route path="/welcome" component={Welcome}/>
      <Route path="/get-the-app/:video" component={GetApp}/>

      <Route path="/" component={App}>
        { /* Home (main) route */ }
        <IndexRoute component={Home}/>

        { /* Static routes at the top so they get intercepted first */ }
        <Route path="about" component={About}/>
        <Route path="faq" component={FAQ}/>
        <Route path="login" component={Home}/>
        <Route path="signup" component={Home}/>
        <Route path="privacy-policy" component={PrivacyPolicy}/>
        <Route path="terms-of-service" component={TermsOfService}/>

        {/* Dynamic routes after */}
        <Route path="search/:query" component={Search}/>

        {/* Category only, no channel slug */}
        <Route path=":category" component={Grid}/>

        { /* IVP Pages */ }
        <Route path="video/:video" component={IVP}/>
        <Route path="channel/:slug" component={IVP}/>
        <Route path="channel/:slug/video/:video" component={IVP}/>
        <Route path="channel/:slug/:childSlug" component={IVP}/>
        <Route path="channel/:slug/:childSlug/video/:video" component={IVP}/>
        <Route path=":category/:slug" component={IVP}/>
        <Route path=":category/:slug/video/:video" component={IVP}/>

        { /* Catch all route */ }
        <Route path="*" component={NotFound} status={404}/>
      </Route>
    </Router>
  );
};
