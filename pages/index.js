import Head from 'next/head';
import Layout, { siteTitle } from '../components/Layout';
import styled from 'styled-components';
import Subscribe from '../components/ Subscribe';

const HeroSection = styled.section`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const HeroContainer = styled.div`
  margin-top: 20vh;
  max-width: 1200px;
  width: 100%;
  margin-right: 2rem;
  margin-left: 2rem;
`;

const Section = styled.section``;

const Container = styled.div``;

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
