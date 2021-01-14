import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => (
  <div>
    <Header siteEmoji={siteEmoji} siteTitle={siteTitle} />
    <main>{children}</main>
    <Footer />
  </div>
);

export default Layout;
