import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import styled from 'styled-components';

const Main = styled.main`
  width: 100%;
  /* position: absolute;
  display: flex;
  top: 0;
  left: 0;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch; */
`;

export const siteEmoji = '📂';
export const siteTitle = 'Linkfolders';
export const description = 'Keep all your Links organised in one place';

const Layout = ({ children }) => (
  <div>
    <Head>
      <link rel="icon" href="/favicons/favicon.ico" />
      <meta name="description" content={description} />
      <meta name="og:title" content={siteTitle} />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicons/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicons/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicons/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicons/safari-pinned-tab.svg"
        color="#f5b200"
      />
      <meta name="msapplication-TileColor" content="#ffc40d" />
      <meta name="theme-color" content="#ffffff" />
    </Head>

    <Header siteEmoji={siteEmoji} siteTitle={siteTitle} />
    <Main>{children}</Main>
    <Footer />
  </div>
);

export default Layout;
