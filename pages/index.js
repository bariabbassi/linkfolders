import Head from 'next/head';
import Layout, { siteTitle } from '../components/Layout';
import styled from 'styled-components';
import Subscribe from '../components/ Subscribe';
import { auth } from 'firebase-admin';

const HeroSection = styled.section`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-right: 2rem;
  margin-left: 2rem;
`;

const HeroContainer = styled.div`
  margin-top: 15vh;
  max-width: 1500px;
  width: 100%;
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
        <button onClick={(e) => auth.signinWithGitHub()}></button>
        <Subscribe />
      </HeroContainer>
    </HeroSection>
  </Layout>
);

export default Home;
