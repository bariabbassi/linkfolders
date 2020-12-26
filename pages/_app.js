import App from 'next/app';
import { ThemeProvider } from 'styled-components';

import '../styles/global.css';
import { AuthProvider } from '@/lib/auth';

const theme = {
  colors: {
    yellow: '#ffcc00',
    darkyellow: '#f7c701',
    lightyellow: '#ffd93f'
  }
};

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ThemeProvider>
    );
  }
}
