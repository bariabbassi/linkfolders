import Head from 'next/head'
import Header from './header'
import Footer from './footer'
import styled from "styled-components"

const Main = styled.main`
  width: 100%;
  /* position: absolute;
  display: flex;
  top: 0;
  left: 0;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch; */
`

export const siteEmoji = '📂'
export const siteTitle = 'Linkfolders'
export const description = 'Keep all your Links organised in one place'

const Layout = ({ children }) => (
  <div>
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <meta
        name="description"
        content={description}
      />
      <meta name="og:title" content={siteTitle} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>

    <Header siteEmoji={siteEmoji} siteTitle={siteTitle} />
    <Main>{children}</Main>
    <Footer />
  </div>
)

export default Layout