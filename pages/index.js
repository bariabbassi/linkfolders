import Head from 'next/head';
import Layout, { siteTitle } from '../components/Layout';
import styled from 'styled-components';
import Subscribe from '../components/ Subscribe';

const HeroSection = styled.section`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  /* background: rgb(152, 200, 245); */
`;

const HeroContainer = styled.div`
  margin-top: 15vh;
  max-width: 1200px;
  width: 90vw;
`;

const Section = styled.section`
  width: 100%;
`;

const Container = styled.div`
  /* max-width: 900px;
  width: 90vw; */
`;

const Home = () => (
  <Layout>
    <Head>
      <title>{siteTitle}</title>
    </Head>

    <HeroSection>
      <HeroContainer>
        <h1>
          A file system
          <br />
          for the web
        </h1>
        <p>
          {siteTitle} helps you bookmark and organize all your links in folders
          <br />
          so you can quickly grab them whenever you need them.
        </p>
        <h4>We’re in private beta. Drop in your email for updates.</h4>
        <Subscribe />
      </HeroContainer>
    </HeroSection>
    <Section>
      <Container>
        <h1></h1>
        <p></p>
      </Container>
    </Section>
  </Layout>
);

export default Home;
