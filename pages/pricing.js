import Head from 'next/head';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: space-between;
  justify-content: space-around;
`;

const PriceCard = styled.div`
  width: 100px;
  text-align: center;
  padding: 18px;
  margin-top: 30px;
  border-radius: 35px;
  background: rgb(152, 200, 245);
`;

const Pricing = () => (
  <Layout>
    <Head>
      <title>Linkfolders - Pricing</title>
    </Head>

    <h1>Pricing</h1>
    <Container>
      <PriceCard>
        <h3>Free</h3>
      </PriceCard>
      <PriceCard>
        <h3>9$</h3>
      </PriceCard>
    </Container>
  </Layout>
);

export default Pricing;
