import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.object,
    component: PropTypes.node,
    store: PropTypes.object
  };

  render() {
    const { assets, component, store } = this.props;
    const content = component ? ReactDOM.renderToString(component) : '';
    const head = Helmet.rewind();

    return (
      <html lang="en-us">
      <head>
        {head.base.toComponent()}
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {head.script.toComponent()}

        <link rel="shortcut icon" href="/favicon.ico"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>


        {/* Prerender-node fragment meta property */}
        <meta name="fragment" content="!"/>

        {/* styles (will be present only in production with webpack extract text plugin) */}
        {Object.keys(assets.styles).map((style, key) =>
          <link href={assets.styles[style]} key={key} media="screen, projection"
                rel="stylesheet" type="text/css" charSet="UTF-8"/>
        )}

        <script src="//cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.en"/>

        {/* Facebook Javscript SDK */}
        <script dangerouslySetInnerHTML={{
          __html: `
            window.fbAsyncInit = function(){FB.init({appId:'365760873784674',xfbml: true,version    : 'v2.8'});FB.AppEvents.logPageView();};(function(d, s, id){var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) {return;}js = d.createElement(s); js.id = id;js.src = "//connect.facebook.net/en_US/sdk.js";fjs.parentNode.insertBefore(js, fjs);}(document, 'script', 'facebook-jssdk'));`
        }}/>

        {/* Google analytics */}
        <script dangerouslySetInnerHTML={{
          __html: `
           (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create','UA-76362791-1','auto');ga('send','pageview');`
        }}/>

        {/* Facebook pixel scripts */}
        <script dangerouslySetInnerHTML={{
          __html: `
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '244336846027894');fbq('track', 'PageView');`
        }}/>
        <noscript dangerouslySetInnerHTML={{
          __html: `
          <img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=244336846027894&amp;ev=PageView&amp;noscript=1"`
        }}/>

        {/* (will be present only in development mode) */}
        {/* outputs a <style/> tag with all bootstrap styles + App.less + it could be CurrentPage.scss. */}
        {/* can smoothen the initial style flash (flicker) on page load in development mode. */}
        {/* ideally one could also include here the style for the current page (Home.scss, About.scss, etc) */}
        { Object.keys(assets.styles).length === 0 ? <style
          dangerouslySetInnerHTML={{ __html: require('../theme/bootstrap.config.js') + require('../containers/App/App.less')._style }}/> : null }
      </head>
      <body style={{ 'backgroundColor': '#000000' }}>
      <div id="fb-root"></div>
      <div id="content" dangerouslySetInnerHTML={{ __html: content }}/>
      <script dangerouslySetInnerHTML={{ __html: `window.__data=${serialize(store.getState())};` }} charSet="UTF-8"/>
      <script src={assets.javascript.main} charSet="UTF-8"/>
      </body>
      </html>
    );
  }
}
