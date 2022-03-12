import NProgress from "nprogress";
import Page from '../components/Page';
import Router from 'next/router';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

import 'nprogress/nprogress.css';

const MyApp = ({ Component, pageProps }) => {
  return ( 
    <Page>
      <Component {...pageProps} />
    </Page>
   );
}
 
export default MyApp;