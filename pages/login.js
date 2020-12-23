import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'

// Login
export default () => (
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
)