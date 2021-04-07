import { ChakraProvider } from '@chakra-ui/react';
// import { Global, css } from '@emotion/react';
import { DefaultSeo } from 'next-seo';

import { AuthProvider } from '@/lib/auth';
import theme from '@/styles/theme';

import SEO from '../next-seo.config';

// const GlobalStyle = ({ children }) => {
//   return (
//     <>
//       <Head>
//         <meta content="width=device-width, initial-scale=1" name="viewport" />
//       </Head>
//       <Global
//         styles={css`
//           html {
//             scroll-behavior: smooth;
//           }

//           #__next {
//             display: flex;
//             flex-direction: column;
//             min-height: 100vh;
//           }
//         `}
//       />
//       {children}
//     </>
//   );
// };

const App = ({ Component, pageProps }) => (
  <ChakraProvider theme={theme}>
    <AuthProvider>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </AuthProvider>
  </ChakraProvider>
);

export default App;
