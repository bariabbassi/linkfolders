import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import styled from 'styled-components'

const HeroSection = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background: rgb(152, 200, 245); */
`

const HeroContainer = styled.div`
  height: 100vh;
  margin-top: 10vh;
  max-width: 900px;
  width: 90vw;
`

const A = styled.a`
    color: #fff;
    font-size: 1rem;
    font-weight: 600;
    padding: 22px;
    margin-top: 30px;
    border-radius: 35px;
    background: #09f;
    &:hover{
        color: #f4f4f4;
        background: #0af;;
    }
    &:active{
        background: #4564f5;
    }
`

const Section = styled.section`
  width: 100%;
`

const Container = styled.div`
  /* max-width: 900px;
  width: 90vw; */
`

const Home = ({ allPostsData }) => (
  <Layout>
    <Head>
      <title>{siteTitle}</title>
    </Head>
    
    <HeroSection>
      <HeroContainer>
      <h1>
        Bookmark
        <br />
        Organize
        <br />
        Share
      </h1>
      <p>
        LinkFolders helps you bookmark and organize all your links in folders
        <br />
        so you can quickly grab them and share them whenever you want.
      </p>
      <div>
      <A>
        Sign up for free →
      </A>
      </div>
      </HeroContainer>
    </HeroSection>
    {/* <Section>
      <Container>
        <h1></h1>
        <p>
        </p>
      </Container>
    </Section> */}
  </Layout>
)

export default Home