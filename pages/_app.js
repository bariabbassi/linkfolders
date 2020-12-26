import App from 'next/app';
import '../styles/global.css';
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    babyblue: 'rgb(152, 200, 245)'
  }
};

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}
