import NProgress from "nprogress";
import '../components/styles/nprogress.css';
import Page from '../components/Page';
import Router from 'next/router';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());


const MyApp = ({ Component, pageProps }) => {
  return ( 
    <Page>
      <Component {...pageProps} />
    </Page>
   );
}
 
export default MyApp;