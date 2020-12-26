import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

export const siteEmoji = '📂';
export const siteTitle = 'Linkfolders';
export const description = 'A file system for the web';

const Layout = ({ children }) => (
  <div>
    <Head>
      <link href="https://rsms.me/inter/inter.css" rel="stylesheet" />
      <link href="/favicons/favicon.ico" rel="shortcut icon" />
      <link href="/favicons/site.webmanifest" rel="manifest" />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicons/favicon-16x16.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicons/favicon-32x32.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicons/apple-touch-icon.png"
      />
      <link rel="manifest" href="/favicons/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicons/safari-pinned-tab.svg"
        color="#f5b200"
      />
      <meta name="og:title" content={siteTitle} />
      <meta name="description" content={description} />
      <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
      <meta content="/favicons/browserconfig.xml" name="msapplication-config" />
      <meta name="msapplication-TileColor" content="#ffc40d" />
      <meta name="theme-color" content="#ffffff" />
    </Head>

    <Header siteEmoji={siteEmoji} siteTitle={siteTitle} />
    <main>{children}</main>
    <Footer />
  </div>
);

export default Layout;
