import Head from 'next/head';
import Layout, { siteTitle } from '../components/Layout';

const Login = () => (
  <Layout>
    <Head>
      <title>{siteTitle} - Login</title>
    </Head>

    <h1>Login</h1>
    <label>Email</label>
    <br />
    <input></input>
    <br />
    <label>Password</label>
    <br />
    <input></input>
    <br />
    <button>Login</button>
  </Layout>
);

export default Login;
