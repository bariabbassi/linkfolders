import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'

const Signup = () => (
    <Layout>
        <Head>
            <title>{siteTitle} - Sign up</title>
        </Head>

        <h1>Sign up</h1>
        <label>Username</label>
        <br />
        <input></input>
        <br />
        <label>Email</label>
        <br />
        <input></input>
        <br />
        <label>Password</label>
        <br />
        <input></input>
        <br />
        <button>Sign up</button>
    </Layout>
)

export default Signup