import Link from 'next/link';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: grey;
`;

const Container = styled.div`
  /* display: flex;
    justify-content: flex-end; */
  /* flex-wrap: wrap; */
  /* padding: 2px 0; */
  /* margin-top: 35px; */
`;

const List = styled.div``;
const Footer = () => (
  <StyledFooter>
    <Container>
      <List>
        <a
          href="https://github.com/bariabbassi"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>
        <a
          href="https://linkedin.com/in/bariabbassi"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
        <a
          href="https://twitter.com/bariabbassi"
          target="_blank"
          rel="noreferrer"
        >
          Twitter
        </a>
        <a
          href="https://instagram.com/bariabbassi"
          target="_blank"
          rel="noreferrer"
        >
          Instagram
        </a>
      </List>
    </Container>
  </StyledFooter>
);

export default Footer;
